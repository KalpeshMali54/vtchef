import { CUISINES, DISHES } from "../src/data/menuData.js";
import { validateBookingPayload, submitBookingRequest } from "../src/services/bookingService.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

async function runTests() {
  console.log("=== RUNNING VT CHEFS PURE VEGETARIAN TESTS ===");

  // 1. Cuisines Verification
  assert(CUISINES.length === 7, `Should have 7 official cuisines, found ${CUISINES.length}`);
  const cuisineIds = CUISINES.map(c => c.id);
  const expectedCuisines = [
    "mexican", "italian", "chinese", "gujarati", 
    "gujarati-rasoi", "rajasthani-rasoi", "punjabi-rasoi"
  ];
  expectedCuisines.forEach(id => {
    assert(cuisineIds.includes(id), `Expected cuisine ${id} exists`);
  });

  // 2. Strict 100% Pure Vegetarian Rule
  const nonVegTerms = [
    "chicken", "mutton", "lamb", "beef", "pork", "fish", "salmon", "tuna", 
    "seafood", "prawn", "crab", "lobster", "egg", "bacon", "meat", "scallop", "wagyu", "seabass"
  ];

  DISHES.forEach(dish => {
    const textToCheck = `${dish.name} ${dish.description}`.toLowerCase();
    nonVegTerms.forEach(term => {
      // Ensure whole-word non-veg matches don't exist
      const regex = new RegExp(`\\b${term}\\b`, "i");
      assert(!regex.test(textToCheck), `Dish "${dish.name}" must not contain non-veg term "${term}"`);
    });
    // Check pricing rule
    assert(dish.priceInfo === "Price on request", `Dish "${dish.name}" must state "Price on request", got "${dish.priceInfo}"`);
    assert(!textToCheck.includes("₹"), `Dish "${dish.name}" must not have invented ₹ price`);
  });

  // 3. Unique Dish IDs
  const idSet = new Set();
  DISHES.forEach(dish => {
    assert(!idSet.has(dish.id), `Dish ID "${dish.id}" must be unique`);
    idSet.add(dish.id);
  });
  console.log(`Total verified dishes: ${DISHES.length}`);

  // 4. Search Functionality
  const searchResults = DISHES.filter(d => 
    d.name.toLowerCase().includes("paneer") || d.description.toLowerCase().includes("paneer")
  );
  assert(searchResults.length > 0, `Search for 'paneer' should yield dishes, found ${searchResults.length}`);

  // 5. Validation Logic
  const invalidPayload = {
    cuisines: [],
    dishes: {},
    guests: 0,
    eventDetails: {}
  };
  const valResult = validateBookingPayload(invalidPayload);
  assert(!valResult.isValid, "Validation should fail for empty booking payload");
  assert(!!valResult.errors.cuisines, "Should report missing cuisines error");
  assert(!!valResult.errors.dishes, "Should report missing dishes error");
  assert(!!valResult.errors.guests, "Should report invalid guests error");

  const validPayload = {
    cuisines: ["gujarati", "punjabi-rasoi"],
    dishes: {
      "guj-green-dhokla": { id: "guj-green-dhokla", name: "Green Dhokla", cuisineId: "gujarati", qty: 2, priceInfo: "Price on request" }
    },
    occasion: "Birthday",
    guests: 8,
    eventDetails: {
      date: "2026-11-20",
      time: "Evening (7:30 PM)",
      location: "142 Heritage Boulevard, Ahmedabad",
      dietary: { jain: true },
      specialRequests: "Special floral centerpiece"
    }
  };
  const valResultValid = validateBookingPayload(validPayload);
  assert(valResultValid.isValid, "Validation should pass for valid booking payload");

  // 6. Booking Submission Service Test
  const bookingResponse = await submitBookingRequest(validPayload);
  assert(bookingResponse.success === true, "Booking response should indicate success");
  assert(bookingResponse.referenceId.startsWith("VTC-"), `Booking should return reference ID starting with VTC-, got ${bookingResponse.referenceId}`);
  assert(bookingResponse.summary.totalItems === 2, `Total items should be 2, got ${bookingResponse.summary.totalItems}`);

  console.log("=== ALL VT CHEFS TESTS PASSED SUCCESSFULLY! ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
