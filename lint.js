import fs from "fs";
import path from "path";
import { CUISINES, DISHES } from "./src/data/menuData.js";

console.log("=== RUNNING VT CHEFS LINTER & INTEGRITY CHECK ===");

let errors = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`[LINT ERROR] ${message}`);
    errors++;
  } else {
    console.log(`[LINT OK] ${message}`);
  }
}

// 1. Check all cuisine images exist
CUISINES.forEach(c => {
  const localPath = path.join(process.cwd(), "public", c.image);
  check(fs.existsSync(localPath), `Cuisine image exists for ${c.name}: ${c.image}`);
});

// 2. Check vegetarian rule across all dishes
const forbidden = ["chicken", "mutton", "lamb", "beef", "pork", "fish", "salmon", "seafood", "egg", "wagyu", "scallop", "seabass"];
DISHES.forEach(d => {
  const str = `${d.name} ${d.description}`.toLowerCase();
  forbidden.forEach(term => {
    const rx = new RegExp(`\\b${term}\\b`, "i");
    check(!rx.test(str), `Pure veg check for dish "${d.name}": contains "${term}"`);
  });
  check(d.priceInfo === "Price on request", `Dish "${d.name}" must have price "Price on request"`);
});

// 3. Verify HTML files exist and are non-empty
const htmlFiles = ["index.html"];
htmlFiles.forEach(f => {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, "utf-8");
    check(content.length > 500, `${f} is populated (${content.length} bytes)`);
  }
});

if (errors > 0) {
  console.error(`Linter failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log("=== LINT COMPLETED WITH 0 ERRORS ===");
}
