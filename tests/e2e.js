import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import http from "http";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 4173;
const BASE_DIR = path.resolve("./");
const SCREENSHOT_DIR = path.resolve("./tests/screenshots");

fs.makedirs = fs.mkdirSync;
fs.makedirs(SCREENSHOT_DIR, { recursive: true });

// Simple static HTTP server to serve the website
function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png"
    };

    const server = http.createServer((req, res) => {
      let reqPath = req.url.split("?")[0];
      if (reqPath === "/favicon.ico") {
        res.writeHead(204);
        res.end();
        return;
      }
      if (reqPath === "/") reqPath = "/index.html";
      
      let filePath = path.join(BASE_DIR, reqPath);
      if (reqPath.startsWith("/images/")) {
        filePath = path.join(BASE_DIR, "public", reqPath);
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runE2E() {
  console.log("=== STARTING FULL END-TO-END BROWSER AUTOMATION ===");
  const server = await startServer();

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
      console.error("[BROWSER CONSOLE ERROR]:", msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
    console.error("[BROWSER PAGE ERROR]:", err.message);
  });

  try {
    // ------------------------------------------------------------------------
    // 1. DESKTOP TEST (1280x800)
    // ------------------------------------------------------------------------
    console.log("--> Testing Desktop 1280x800...");
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle0" });

    // Step 1: Cuisines
    console.log("Verifying Step 1 Cuisines...");
    await page.waitForSelector(".cuisine-card", { timeout: 5000 });
    const cuisineCardCount = await page.$$eval(".cuisine-card", cards => cards.length);
    console.log(`Found ${cuisineCardCount} cuisine cards (expected 7).`);
    if (cuisineCardCount !== 7) throw new Error(`Expected 7 cuisine cards, got ${cuisineCardCount}`);

    // Select Gujarati and Punjabi Rasoi
    await page.click('[data-cuisine-id="punjabi-rasoi"]');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "01_desktop_step1_cuisines.png") });

    // Continue to Dishes (Step 2)
    console.log("Navigating to Step 2...");
    await page.click('button[onclick*="goToStep(2)"]');
    await page.waitForSelector("#wizard-step-2:not(.hidden)");

    // Step 2: Test Search & Dishes
    console.log("Testing search and dish selection on Step 2...");
    await page.type("#step2-search-input", "Paneer");
    await new Promise(r => setTimeout(r, 300));
    
    // Add dish
    const addBtn = await page.$('.dish-card button[onclick*="updateDishQuantity"]');
    if (!addBtn) throw new Error("Could not find Add button on dish card");
    await addBtn.click();
    await new Promise(r => setTimeout(r, 200));

    // Verify quantity counter is 1
    const qtyText = await page.$eval('.counter-container span', el => el.textContent.trim());
    console.log(`Dish quantity after add: ${qtyText}`);
    if (qtyText !== "1") throw new Error(`Expected quantity 1, got ${qtyText}`);

    // Test Selection Drawer
    console.log("Testing Selection Drawer...");
    await page.click('button[onclick*="toggleDrawer(true)"]');
    await page.waitForSelector('#selection-drawer:not(.hidden)');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "02_desktop_selection_drawer.png") });

    // Close Drawer
    await page.click('#selection-drawer button[onclick*="toggleDrawer(false)"]');
    await new Promise(r => setTimeout(r, 400));

    // Clear Search
    await page.click('#clear-search-btn');
    await new Promise(r => setTimeout(r, 200));

    // Continue to Occasion (Step 3)
    console.log("Navigating to Step 3...");
    await page.click('#wizard-step-2 button[onclick*="goToStep(3)"]');
    await page.waitForSelector('#wizard-step-3:not(.hidden)');

    // Select Birthday Occasion
    await page.click('.occasion-card');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "03_desktop_step3_occasion.png") });

    // Continue to Guests (Step 4)
    console.log("Navigating to Step 4...");
    await page.click('#wizard-step-3 button[onclick*="goToStep(4)"]');
    await page.waitForSelector('#wizard-step-4:not(.hidden)');

    // Set Guests to 15
    await page.click('[data-guest-chip="15"]');
    const guestVal = await page.$eval('#guest-counter-value', el => el.textContent.trim());
    console.log(`Guest scale value: ${guestVal}`);
    if (guestVal !== "15") throw new Error(`Expected guests 15, got ${guestVal}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "04_desktop_step4_guests.png") });

    // Continue to Event Details (Step 5)
    console.log("Navigating to Step 5...");
    await page.click('#wizard-step-4 button[onclick*="goToStep(5)"]');
    await page.waitForSelector('#wizard-step-5:not(.hidden)');

    // Fill Event Details
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    const dateStr = tomorrow.toISOString().split("T")[0];
    await page.$eval('#event-date-input', (el, val) => el.value = val, dateStr);
    await page.select('#event-time-select', 'Dinner Service (7:30 PM - 10:30 PM)');
    await page.type('#event-location-input', 'Sky Villa 402, High-End Residences, Bodakdev');
    await page.click('#diet-opt-jain');
    await page.type('#event-special-input', 'Kindly arrange royal silver service presentation for guests.');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "05_desktop_step5_details.png") });

    // Continue to Review (Step 6)
    console.log("Navigating to Step 6...");
    await page.click('#event-details-form button[type="submit"]');
    await page.waitForSelector('#wizard-step-6:not(.hidden)');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "06_desktop_step6_review.png") });

    // Verify Review items are rendered
    const reviewGuests = await page.$eval('#review-guests-val', el => el.textContent);
    console.log(`Review guests summary: ${reviewGuests}`);
    if (!reviewGuests.includes("15")) throw new Error("Review screen does not show correct guest count");

    // Test Edit back navigation (Click Edit on Occasion -> goes to Step 3)
    console.log("Testing Edit back navigation...");
    await page.click('#wizard-step-6 button[onclick*="goToStep(3)"]');
    await page.waitForSelector('#wizard-step-3:not(.hidden)');
    console.log("Successfully returned to Step 3 via Edit button!");
    
    // Return to Step 6
    await page.click('#wizard-step-3 button[onclick*="goToStep(4)"]');
    await page.waitForSelector('#wizard-step-4:not(.hidden)');
    await page.click('#wizard-step-4 button[onclick*="goToStep(5)"]');
    await page.waitForSelector('#wizard-step-5:not(.hidden)');
    await page.click('#event-details-form button[type="submit"]');
    await page.waitForSelector('#wizard-step-6:not(.hidden)');

    // Test Request Booking Submission
    console.log("Testing Request Booking submission...");
    await page.click('#request-booking-btn');
    await page.waitForSelector('#booking-modal:not(.hidden)', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "07_desktop_booking_confirmed.png") });

    const confirmationText = await page.$eval('#booking-modal-content', el => el.textContent);
    if (!confirmationText.includes("Booking Request Received")) {
      throw new Error("Confirmation modal did not show Booking Request Received");
    }
    console.log("Booking successfully submitted and confirmed with reference ID!");

    // ------------------------------------------------------------------------
    // 2. MOBILE RESPONSIVE TESTS (375px, 390px, 430px)
    // ------------------------------------------------------------------------
    const mobileWidths = [375, 390, 430];
    for (const w of mobileWidths) {
      console.log(`--> Testing Mobile Viewport ${w}x844...`);
      await page.setViewport({ width: w, height: 844 });
      await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: "networkidle0" });
      await new Promise(r => setTimeout(r, 400));

      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`Mobile ${w}px overflow check: ${hasOverflow ? "OVERFLOW DETECTED" : "NO OVERFLOW (PASS)"}`);
      if (hasOverflow) throw new Error(`Horizontal overflow detected at ${w}px!`);

      // Open drawer as mobile bottom sheet
      await page.click('button[aria-label="View Selected Dishes"]');
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `08_mobile_${w}px_drawer.png`) });

      await page.click('#selection-drawer button[aria-label="Close drawer"]');
      await new Promise(r => setTimeout(r, 400));
    }

    if (consoleErrors.length > 0) {
      throw new Error(`Encountered ${consoleErrors.length} browser console errors during E2E testing!`);
    }

    console.log("=== ALL E2E BROWSER TESTS PASSED FLAWLESSLY WITH 0 ERRORS! ===");
  } finally {
    await browser.close();
    server.close();
  }
}

runE2E().catch((err) => {
  console.error("E2E Test Failed:", err);
  process.exit(1);
});
