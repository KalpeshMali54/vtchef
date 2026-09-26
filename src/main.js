/**
 * VT CHEFS — Main Application Logic
 * 100% Pure Vegetarian Private Dining & Create Menu Experience
 */

import { CUISINES, DISHES, OCCASIONS } from "./data/menuData.js";
import { loadSavedState, saveState, clearSavedState, DEFAULT_STATE } from "./utils/storage.js";
import { submitBookingRequest, validateBookingPayload } from "./services/bookingService.js";

// Global App State
let state = loadSavedState();

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Active Filters for Step 2
let dishFilter = {
  search: "",
  category: "all",
  cuisine: "all",
  diet: { veg: false, vegan: false, jain: false }
};

// UI Elements Cache
const elements = {
  headerCartBadge: document.getElementById("header-cart-badge"),
  drawerCartBadge: document.getElementById("drawer-cart-badge"),
  drawerItemsContainer: document.getElementById("drawer-items-container"),
  drawerEmptyState: document.getElementById("drawer-empty-state"),
  drawerTotalItems: document.getElementById("drawer-total-items"),
  selectionDrawer: document.getElementById("selection-drawer"),
  drawerPanel: document.getElementById("drawer-panel"),
  toast: document.getElementById("toast-notification"),
  toastMessage: document.getElementById("toast-message"),
  bookingModal: document.getElementById("booking-modal")
};

// Helper: Show Toast Notification
export function showToast(message, type = "info") {
  if (!elements.toast || !elements.toastMessage) return;
  elements.toastMessage.textContent = message;
  elements.toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
  elements.toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    elements.toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    elements.toast.classList.remove("opacity-100", "translate-y-0");
  }, 3500);
}

// ----------------------------------------------------
// Navigation & Views
// ----------------------------------------------------
export function switchTab(tabName) {
  state.activeTab = tabName;
  saveState(state);

  // Update header links
  document.querySelectorAll("[data-nav-tab]").forEach(link => {
    const isCurrent = link.getAttribute("data-nav-tab") === tabName;
    if (isCurrent) {
      link.classList.add("bg-primary-container", "text-on-primary-container", "font-medium");
      link.classList.remove("text-on-surface-variant");
    } else {
      link.classList.remove("bg-primary-container", "text-on-primary-container", "font-medium");
      link.classList.add("text-on-surface-variant");
    }
  });

  // Toggle visible sections
  const sections = ["home-view", "cuisines-view", "create-menu-view", "our-story-view"];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === `${tabName}-view`) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----------------------------------------------------
// Stepper Navigation (Create Menu)
// ----------------------------------------------------
export function goToStep(stepNumber) {
  // Validation checks before proceeding forward
  if (stepNumber > state.step) {
    if (state.step === 1 && state.selectedCuisines.length === 0) {
      showToast("Please select at least one cuisine to continue.", "warning");
      return;
    }
    if (state.step === 2 && Object.keys(state.dishes).length === 0) {
      showToast("Please select at least one dish for your bespoke menu.", "warning");
      return;
    }
    if (state.step === 3 && !state.occasion) {
      showToast("Please select an occasion for your event.", "warning");
      return;
    }
    if (state.step === 5) {
      const details = getEventDetailsFromForm();
      const val = validateBookingPayload({
        cuisines: state.selectedCuisines,
        dishes: state.dishes,
        occasion: state.occasion,
        guests: state.guests,
        eventDetails: details
      });
      if (val.errors.date || val.errors.time || val.errors.location) {
        showToast(val.errors.date || val.errors.time || val.errors.location, "warning");
        return;
      }
      state.eventDetails = details;
    }
  }

  // Update current step
  state.step = stepNumber;
  saveState(state);

  // Update stepper indicator icons
  for (let i = 1; i <= 6; i++) {
    const ind = document.getElementById(`step-ind-${i}`);
    const label = document.getElementById(`step-lbl-${i}`);
    const panel = document.getElementById(`wizard-step-${i}`);

    if (panel) {
      if (i === stepNumber) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    }

    if (ind && label) {
      if (i === stepNumber) {
        ind.className = "w-10 h-10 rounded-full bg-primary text-on-primary border-2 border-tertiary-fixed flex items-center justify-center font-headline-sm transition-all shadow-md";
        label.classList.add("text-primary", "font-semibold");
        label.classList.remove("text-on-surface-variant");
      } else if (i < stepNumber) {
        ind.className = "w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm transition-all";
        ind.innerHTML = `<span class="material-symbols-outlined text-[18px]">check</span>`;
        label.classList.remove("text-primary", "font-semibold");
        label.classList.add("text-on-surface-variant");
      } else {
        ind.className = "w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-headline-sm transition-all";
        ind.textContent = `0${i}`;
        label.classList.remove("text-primary", "font-semibold");
        label.classList.add("text-on-surface-variant");
      }
    }
  }

  // Render specific steps if needed
  if (stepNumber === 2) {
    renderStep2Dishes();
  } else if (stepNumber === 6) {
    renderStep6Review();
  }

  window.scrollTo({ top: 120, behavior: "smooth" });
}

// ----------------------------------------------------
// STEP 1: Cuisine Selection
// ----------------------------------------------------
export function renderCuisinesGrid() {
  const container = document.getElementById("cuisines-grid-container");
  if (!container) return;

  container.innerHTML = CUISINES.map(cuisine => {
    const isSelected = state.selectedCuisines.includes(cuisine.id);
    return `
      <div 
        class="cuisine-card group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${isSelected ? 'border-tertiary-fixed ring-2 ring-primary/40' : 'border-transparent'}"
        data-cuisine-id="${cuisine.id}"
        onclick="window.vtChefs.toggleCuisineSelection('${cuisine.id}')"
      >
        <div 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style="background-image: url('${cuisine.image}')"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
        <div class="absolute top-4 left-4 flex gap-1">
          <span class="px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-label-sm text-primary font-bold border border-secondary/30">100% PURE VEG</span>
        </div>
        <div class="absolute top-4 right-4 w-9 h-9 rounded-full ${isSelected ? 'bg-secondary text-on-secondary opacity-100 scale-100' : 'bg-surface/30 text-on-primary opacity-0 scale-90'} backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md">
          <span class="material-symbols-outlined text-[20px]">check</span>
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-space-md text-on-primary">
          <span class="text-label-sm text-tertiary-fixed uppercase tracking-wider font-semibold">${cuisine.subtitle}</span>
          <h3 class="font-headline-md text-on-primary mt-1 text-2xl">${cuisine.name}</h3>
          <p class="text-body-sm text-inverse-on-surface/90 mt-1 line-clamp-2 leading-relaxed">${cuisine.description}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${cuisine.tags.map(t => `<span class="text-[11px] px-2 py-0.5 rounded bg-surface/20 text-tertiary-fixed backdrop-blur-xs font-medium">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

export function toggleCuisineSelection(cuisineId) {
  const index = state.selectedCuisines.indexOf(cuisineId);
  if (index > -1) {
    state.selectedCuisines.splice(index, 1);
  } else {
    state.selectedCuisines.push(cuisineId);
  }
  saveState(state);
  renderCuisinesGrid();
}

// ----------------------------------------------------
// STEP 2: Dishes & Courses
// ----------------------------------------------------
export function renderStep2Dishes() {
  const container = document.getElementById("step2-dishes-grid");
  const cuisinePillContainer = document.getElementById("step2-cuisine-filter-pills");
  if (!container) return;

  // Render cuisine filter pills
  if (cuisinePillContainer) {
    const selectedCuisineObjs = CUISINES.filter(c => state.selectedCuisines.includes(c.id));
    cuisinePillContainer.innerHTML = `
      <button 
        class="px-3.5 py-1.5 rounded-full text-label-md transition-all shrink-0 ${dishFilter.cuisine === 'all' ? 'bg-primary text-on-primary font-medium shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}"
        onclick="window.vtChefs.setDishCuisineFilter('all')"
      >
        All Selected Cuisines (${selectedCuisineObjs.length})
      </button>
      ${selectedCuisineObjs.map(c => `
        <button 
          class="px-3.5 py-1.5 rounded-full text-label-md transition-all shrink-0 ${dishFilter.cuisine === c.id ? 'bg-primary text-on-primary font-medium shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}"
          onclick="window.vtChefs.setDishCuisineFilter('${c.id}')"
        >
          ${c.name}
        </button>
      `).join("")}
    `;
  }

  // Filter dishes
  const filteredDishes = DISHES.filter(dish => {
    // Must belong to user's selected cuisines
    if (!state.selectedCuisines.includes(dish.cuisineId)) return false;

    // Cuisine tab filter
    if (dishFilter.cuisine !== "all" && dish.cuisineId !== dishFilter.cuisine) return false;

    // Category filter
    if (dishFilter.category !== "all" && dish.category !== dishFilter.category) return false;

    // Search query
    if (dishFilter.search.trim()) {
      const q = dishFilter.search.toLowerCase().trim();
      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchCuisine = dish.cuisineId.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCuisine) return false;
    }

    // Dietary filters
    if (dishFilter.diet.veg && !dish.diet.includes("veg")) return false;
    if (dishFilter.diet.vegan && !dish.diet.includes("vegan")) return false;
    if (dishFilter.diet.jain && !dish.diet.includes("jain")) return false;

    return true;
  });

  if (filteredDishes.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-space-xl flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
        <span class="material-symbols-outlined text-[48px] text-outline mb-2">dinner_dining</span>
        <h3 class="font-headline-md text-primary text-xl">No pure vegetarian dishes found</h3>
        <p class="text-body-sm text-on-surface-variant max-w-md mt-1">Try adjusting your search terms or dietary filters to explore our pure vegetarian culinary creations.</p>
        <button class="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-medium hover:bg-primary-container transition-colors" onclick="window.vtChefs.clearDishSearch()">
          Clear Search &amp; Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredDishes.map(dish => {
    const selectedItem = state.dishes[dish.id];
    const qty = selectedItem ? selectedItem.qty : 0;
    const cuisineObj = CUISINES.find(c => c.id === dish.cuisineId);
    const cuisineName = cuisineObj ? cuisineObj.name : dish.cuisineId;

    return `
      <div class="dish-card flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/20" data-dish-id="${dish.id}">
        <div class="relative h-48 bg-cover bg-center" style="background-image: url('${dish.image}')">
          <div class="absolute top-3 left-3">
            <span class="px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-label-sm text-primary font-bold border border-secondary/30">Veg</span>
          </div>
          <div class="absolute top-3 right-3 flex gap-1">
            ${dish.diet.includes("jain") ? `<span class="px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-label-sm text-primary font-medium border border-secondary/30">Jain</span>` : ""}
            ${dish.diet.includes("vegan") ? `<span class="px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-label-sm text-primary font-medium border border-secondary/30">Vegan</span>` : ""}
          </div>
        </div>
        <div class="p-space-md flex flex-col flex-1 justify-between">
          <div>
            <div class="text-label-sm uppercase tracking-wider text-secondary mb-1">${cuisineName} • ${capitalize(dish.category)}</div>
            <h3 class="font-headline-md text-primary text-xl mb-1.5">${dish.name}</h3>
            <p class="font-body-sm text-on-surface-variant line-clamp-2 mb-space-md text-sm leading-relaxed">${dish.description}</p>
          </div>
          <div class="flex items-center justify-between pt-space-sm border-t border-outline-variant/20 mt-auto">
            <div>
              <span class="text-label-md text-secondary font-semibold block">${dish.priceInfo}</span>
              <span class="text-[11px] text-on-surface-variant">Bespoke chef preparation</span>
            </div>
            <div class="counter-container flex items-center">
              ${qty > 0 ? `
                <div class="flex items-center gap-2 bg-surface-container-high px-2 py-1 rounded-lg border border-outline-variant/30">
                  <button class="w-7 h-7 rounded bg-surface text-primary hover:bg-surface-container flex items-center justify-center font-bold text-sm shadow-xs transition-colors" onclick="window.vtChefs.updateDishQuantity('${dish.id}', -1)">−</button>
                  <span class="w-6 text-center font-semibold text-primary text-sm">${qty}</span>
                  <button class="w-7 h-7 rounded bg-surface text-primary hover:bg-surface-container flex items-center justify-center font-bold text-sm shadow-xs transition-colors" onclick="window.vtChefs.updateDishQuantity('${dish.id}', 1)">+</button>
                </div>
              ` : `
                <button class="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-label-md hover:bg-primary-container transition-colors shadow-xs flex items-center gap-1" onclick="window.vtChefs.updateDishQuantity('${dish.id}', 1)">
                  <span class="material-symbols-outlined text-[16px]">add</span> Add
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

export function updateDishQuantity(dishId, delta) {
  const dish = DISHES.find(d => d.id === dishId);
  if (!dish) return;

  if (!state.dishes[dishId]) {
    if (delta > 0) {
      state.dishes[dishId] = {
        id: dish.id,
        name: dish.name,
        cuisineId: dish.cuisineId,
        category: dish.category,
        qty: delta,
        priceInfo: dish.priceInfo
      };
    }
  } else {
    state.dishes[dishId].qty += delta;
    if (state.dishes[dishId].qty <= 0) {
      delete state.dishes[dishId];
    }
  }

  saveState(state);
  updateCartCounters();
  renderStep2Dishes();
  renderDrawerItems();
  if (state.step === 6) renderStep6Review();
}

export function setDishCategoryFilter(category) {
  dishFilter.category = category;
  document.querySelectorAll("[data-cat-btn]").forEach(btn => {
    if (btn.getAttribute("data-cat-btn") === category) {
      btn.className = "px-3 py-1.5 rounded-lg text-label-md bg-primary text-on-primary transition-colors font-medium";
    } else {
      btn.className = "px-3 py-1.5 rounded-lg text-label-md bg-surface-container hover:bg-surface-container-highest text-on-surface transition-colors";
    }
  });
  renderStep2Dishes();
}

export function setDishCuisineFilter(cuisineId) {
  dishFilter.cuisine = cuisineId;
  renderStep2Dishes();
}

export function applyDietFilter(dietKey, isChecked) {
  dishFilter.diet[dietKey] = isChecked;
  renderStep2Dishes();
}

export function onDishSearchInput(query) {
  dishFilter.search = query;
  const clearBtn = document.getElementById("clear-search-btn");
  if (clearBtn) {
    if (query.trim().length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }
  renderStep2Dishes();
}

export function clearDishSearch() {
  dishFilter.search = "";
  dishFilter.category = "all";
  dishFilter.cuisine = "all";
  dishFilter.diet = { veg: false, vegan: false, jain: false };

  const searchInput = document.getElementById("step2-search-input");
  if (searchInput) searchInput.value = "";
  const clearBtn = document.getElementById("clear-search-btn");
  if (clearBtn) clearBtn.classList.add("hidden");

  document.querySelectorAll("[data-diet-check]").forEach(cb => cb.checked = false);
  setDishCategoryFilter("all");
}

// ----------------------------------------------------
// STEP 3: Occasion Selection
// ----------------------------------------------------
export function renderOccasionsGrid() {
  const container = document.getElementById("occasions-grid");
  if (!container) return;

  container.innerHTML = OCCASIONS.map(occ => {
    const isSelected = state.occasion === occ.title;
    return `
      <div 
        class="occasion-card group p-space-md rounded-xl cursor-pointer border-2 transition-all duration-300 bg-surface-container-lowest hover:bg-surface-container-low flex flex-col justify-between ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-md bg-surface-container-low' : 'border-outline-variant/30 shadow-xs'}"
        onclick="window.vtChefs.selectOccasion('${occ.title}')"
      >
        <div class="flex items-start justify-between">
          <div class="w-12 h-12 rounded-full ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary'} flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[24px]">${occ.icon}</span>
          </div>
          <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-secondary text-on-secondary opacity-100' : 'opacity-0'} flex items-center justify-center transition-opacity">
            <span class="material-symbols-outlined text-[14px]">check</span>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="font-headline-sm text-primary text-lg font-medium">${occ.title}</h3>
          <p class="text-body-sm text-on-surface-variant text-xs mt-1 leading-relaxed">${occ.subtitle}</p>
        </div>
      </div>
    `;
  }).join("");
}

export function selectOccasion(occasionTitle) {
  state.occasion = occasionTitle;
  saveState(state);
  renderOccasionsGrid();
}

// ----------------------------------------------------
// STEP 4: Guests & Scale
// ----------------------------------------------------
export function updateGuestCount(delta) {
  const newCount = Math.max(1, state.guests + delta);
  state.guests = newCount;
  saveState(state);
  renderGuestDisplay();
}

export function setGuestQuickOption(count) {
  state.guests = count;
  saveState(state);
  renderGuestDisplay();
}

export function renderGuestDisplay() {
  const display = document.getElementById("guest-counter-value");
  if (display) display.textContent = state.guests;

  // Highlight quick buttons
  document.querySelectorAll("[data-guest-chip]").forEach(btn => {
    const val = parseInt(btn.getAttribute("data-guest-chip"), 10);
    if (val === state.guests) {
      btn.className = "px-4 py-2 rounded-lg bg-primary text-on-primary font-bold shadow-xs text-sm";
    } else {
      btn.className = "px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors";
    }
  });
}

// ----------------------------------------------------
// STEP 5: Event Details
// ----------------------------------------------------
export function getEventDetailsFromForm() {
  const dateEl = document.getElementById("event-date-input");
  const timeEl = document.getElementById("event-time-select");
  const locationEl = document.getElementById("event-location-input");
  const specialEl = document.getElementById("event-special-input");

  return {
    date: dateEl ? dateEl.value : state.eventDetails.date,
    time: timeEl ? timeEl.value : state.eventDetails.time,
    location: locationEl ? locationEl.value : state.eventDetails.location,
    dietary: {
      jain: document.getElementById("diet-opt-jain")?.checked || false,
      vegan: document.getElementById("diet-opt-vegan")?.checked || false,
      glutenFree: document.getElementById("diet-opt-gf")?.checked || false,
      nutFree: document.getElementById("diet-opt-nut")?.checked || false
    },
    specialRequests: specialEl ? specialEl.value : state.eventDetails.specialRequests
  };
}

export function populateEventDetailsForm() {
  const dateEl = document.getElementById("event-date-input");
  const timeEl = document.getElementById("event-time-select");
  const locationEl = document.getElementById("event-location-input");
  const specialEl = document.getElementById("event-special-input");

  if (dateEl && state.eventDetails.date) dateEl.value = state.eventDetails.date;
  if (timeEl && state.eventDetails.time) timeEl.value = state.eventDetails.time;
  if (locationEl && state.eventDetails.location) locationEl.value = state.eventDetails.location;
  if (specialEl && state.eventDetails.specialRequests) specialEl.value = state.eventDetails.specialRequests;

  if (document.getElementById("diet-opt-jain")) {
    document.getElementById("diet-opt-jain").checked = !!state.eventDetails.dietary?.jain;
  }
  if (document.getElementById("diet-opt-vegan")) {
    document.getElementById("diet-opt-vegan").checked = !!state.eventDetails.dietary?.vegan;
  }
  if (document.getElementById("diet-opt-gf")) {
    document.getElementById("diet-opt-gf").checked = !!state.eventDetails.dietary?.glutenFree;
  }
  if (document.getElementById("diet-opt-nut")) {
    document.getElementById("diet-opt-nut").checked = !!state.eventDetails.dietary?.nutFree;
  }
}

// ----------------------------------------------------
// STEP 6: Review & Confirmation
// ----------------------------------------------------
export function renderStep6Review() {
  const cuisinesReview = document.getElementById("review-cuisines-list");
  const dishesReview = document.getElementById("review-dishes-list");
  const occasionReview = document.getElementById("review-occasion-val");
  const guestsReview = document.getElementById("review-guests-val");
  const detailsReview = document.getElementById("review-details-val");

  if (cuisinesReview) {
    const selectedCuisineObjs = CUISINES.filter(c => state.selectedCuisines.includes(c.id));
    cuisinesReview.innerHTML = selectedCuisineObjs.map(c => `
      <div class="flex items-center gap-3 p-3 bg-surface rounded-lg border border-outline-variant/30">
        <img src="${c.image}" class="w-12 h-12 object-cover rounded-md" alt="${c.name}"/>
        <div>
          <div class="font-medium text-primary text-base">${c.name}</div>
          <div class="text-xs text-secondary font-medium">100% Pure Vegetarian</div>
        </div>
      </div>
    `).join("");
  }

  if (dishesReview) {
    const items = Object.values(state.dishes);
    if (items.length === 0) {
      dishesReview.innerHTML = `<div class="text-sm text-outline">No dishes selected yet.</div>`;
    } else {
      dishesReview.innerHTML = items.map(item => `
        <div class="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline-variant/20">
          <div>
            <div class="font-medium text-on-surface text-sm">${item.name}</div>
            <div class="text-xs text-on-surface-variant capitalize">${item.cuisineId} • ${item.category || 'Dish'}</div>
          </div>
          <div class="text-right">
            <span class="text-sm font-bold text-primary px-2 py-0.5 rounded bg-surface-container">Qty: ${item.qty}</span>
            <div class="text-[11px] text-secondary font-semibold mt-0.5">Price on request</div>
          </div>
        </div>
      `).join("");
    }
  }

  if (occasionReview) {
    occasionReview.textContent = state.occasion || "Not selected yet";
  }

  if (guestsReview) {
    guestsReview.textContent = `${state.guests} Distinguished Guests`;
  }

  if (detailsReview) {
    const d = state.eventDetails;
    const dietaryList = [];
    if (d.dietary?.jain) dietaryList.push("Strict Jain (No root vegetables)");
    if (d.dietary?.vegan) dietaryList.push("Vegan (Dairy-Free)");
    if (d.dietary?.glutenFree) dietaryList.push("Gluten-Free");
    if (d.dietary?.nutFree) dietaryList.push("Nut-Free");

    detailsReview.innerHTML = `
      <div class="space-y-1.5 text-sm">
        <div><span class="text-on-surface-variant font-medium">Event Date:</span> <span class="text-primary font-semibold">${d.date || 'To be specified'}</span></div>
        <div><span class="text-on-surface-variant font-medium">Time Slot:</span> <span class="text-primary font-semibold">${d.time || 'To be specified'}</span></div>
        <div><span class="text-on-surface-variant font-medium">Location:</span> <span class="text-primary font-semibold">${d.location || 'To be specified'}</span></div>
        <div><span class="text-on-surface-variant font-medium">Dietary Requirements:</span> <span class="text-secondary font-medium">${dietaryList.length > 0 ? dietaryList.join(", ") : "Standard 100% Pure Vegetarian"}</span></div>
        ${d.specialRequests ? `<div><span class="text-on-surface-variant font-medium">Chef Notes:</span> <span class="text-on-surface italic">"${d.specialRequests}"</span></div>` : ""}
      </div>
    `;
  }
}

// ----------------------------------------------------
// Request Booking Submission
// ----------------------------------------------------
export async function handleBookingSubmission() {
  const submitBtn = document.getElementById("request-booking-btn");
  const errorAlert = document.getElementById("booking-error-alert");
  const errorText = document.getElementById("booking-error-text");

  if (errorAlert) errorAlert.classList.add("hidden");

  // Validate whole state
  const payload = {
    cuisines: state.selectedCuisines,
    dishes: state.dishes,
    occasion: state.occasion,
    guests: state.guests,
    eventDetails: getEventDetailsFromForm()
  };

  const validation = validateBookingPayload(payload);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    showToast(firstError, "error");
    if (errorAlert && errorText) {
      errorText.textContent = firstError;
      errorAlert.classList.remove("hidden");
    }
    return;
  }

  // Loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-block animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
      <span>Securing Chef Availability...</span>
    `;
  }

  try {
    const result = await submitBookingRequest(payload);
    state.bookingResult = result;
    saveState(state);

    // Show Success Modal
    renderBookingSuccessModal(result);
  } catch (err) {
    console.error("Booking error:", err);
    if (errorAlert && errorText) {
      errorText.textContent = err.message || "Unable to submit booking request. Please check your connection and try again.";
      errorAlert.classList.remove("hidden");
    }
    showToast(err.message || "Failed to submit booking.", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Request Booking</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      `;
    }
  }
}

export function renderBookingSuccessModal(result) {
  const modal = elements.bookingModal;
  const content = document.getElementById("booking-modal-content");
  if (!modal || !content) return;

  const dishList = result.summary.dishes.map(d => `<li>${d.name} (${d.quantity}x)</li>`).join("");

  content.innerHTML = `
    <div class="text-center p-space-lg">
      <div class="w-16 h-16 rounded-full bg-secondary text-on-secondary mx-auto flex items-center justify-center mb-4 shadow-lg">
        <span class="material-symbols-outlined text-[36px]">verified</span>
      </div>
      <span class="text-label-sm uppercase tracking-widest text-secondary font-bold block mb-1">Reservation Confirmed</span>
      <h2 class="font-headline-lg text-primary text-3xl mb-2">Booking Request Received</h2>
      <div class="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-mono text-sm font-bold tracking-wider mb-4">
        Reference: ${result.referenceId}
      </div>
      <p class="text-body-md text-on-surface-variant max-w-md mx-auto mb-space-md leading-relaxed text-sm">
        Thank you for choosing <strong>VT CHEFS — 100% Pure Vegetarian Private Dining</strong>. Our executive concierge will review your bespoke culinary progression and contact you within 24 hours to finalize tasting arrangements and present your custom quotation.
      </p>

      <div class="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/30 text-xs space-y-2 mb-space-md">
        <div><strong>Occasion:</strong> ${result.summary.occasion}</div>
        <div><strong>Guests:</strong> ${result.summary.guests} Persons</div>
        <div><strong>Event Date:</strong> ${result.summary.date} (${result.summary.time})</div>
        <div><strong>Venue:</strong> ${result.summary.location}</div>
        <div><strong>Bespoke Dishes:</strong> ${result.summary.totalItems} items selected</div>
        <div><strong>Pricing Policy:</strong> Price on request (Bespoke quotation)</div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button class="px-6 py-3 bg-primary text-on-primary rounded-lg text-label-md font-medium hover:bg-primary-container transition-colors shadow-sm" onclick="window.print()">
          Print / Save Summary
        </button>
        <button class="px-6 py-3 border border-outline-variant text-on-surface rounded-lg text-label-md font-medium hover:bg-surface-container transition-colors" onclick="window.vtChefs.resetAfterBooking()">
          Create Another Menu
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function resetAfterBooking() {
  clearSavedState();
  state = { ...DEFAULT_STATE };
  if (elements.bookingModal) {
    elements.bookingModal.classList.add("hidden");
    elements.bookingModal.classList.remove("flex");
  }
  goToStep(1);
  renderCuisinesGrid();
  updateCartCounters();
}

// ----------------------------------------------------
// Cart & Selection Drawer
// ----------------------------------------------------
export function updateCartCounters() {
  const totalCount = Object.values(state.dishes).reduce((acc, d) => acc + d.qty, 0);

  if (elements.headerCartBadge) {
    elements.headerCartBadge.textContent = totalCount;
  }
  if (elements.drawerCartBadge) {
    elements.drawerCartBadge.textContent = totalCount;
  }
  if (elements.drawerTotalItems) {
    elements.drawerTotalItems.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  }
}

export function toggleDrawer(isOpen) {
  const drawer = elements.selectionDrawer;
  const panel = elements.drawerPanel;
  if (!drawer || !panel) return;

  if (isOpen) {
    renderDrawerItems();
    drawer.classList.remove("hidden");
    setTimeout(() => {
      drawer.classList.remove("opacity-0");
      drawer.classList.add("opacity-100");
      panel.classList.remove("translate-x-full", "translate-y-full");
    }, 10);
  } else {
    drawer.classList.add("opacity-0");
    drawer.classList.remove("opacity-100");
    panel.classList.add("translate-x-full", "translate-y-full");
    setTimeout(() => {
      drawer.classList.add("hidden");
    }, 300);
  }
}

export function renderDrawerItems() {
  const container = elements.drawerItemsContainer;
  const emptyState = elements.drawerEmptyState;
  if (!container) return;

  const items = Object.values(state.dishes);

  if (items.length === 0) {
    if (emptyState) emptyState.classList.remove("hidden");
    container.innerHTML = "";
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = items.map(item => `
    <div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-xs">
      <div class="flex-1 mr-3">
        <h4 class="font-medium text-primary text-sm">${item.name}</h4>
        <div class="text-xs text-on-surface-variant capitalize">${item.cuisineId}</div>
        <div class="text-xs text-secondary font-semibold mt-0.5">${item.priceInfo}</div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 bg-surface-container px-2 py-1 rounded">
          <button class="w-6 h-6 rounded bg-surface hover:bg-surface-container-highest text-primary font-bold text-xs flex items-center justify-center transition-colors" onclick="window.vtChefs.updateDishQuantity('${item.id}', -1)">−</button>
          <span class="w-5 text-center text-xs font-bold text-primary">${item.qty}</span>
          <button class="w-6 h-6 rounded bg-surface hover:bg-surface-container-highest text-primary font-bold text-xs flex items-center justify-center transition-colors" onclick="window.vtChefs.updateDishQuantity('${item.id}', 1)">+</button>
        </div>
        <button class="p-1 text-outline hover:text-error transition-colors" title="Remove item" onclick="window.vtChefs.updateDishQuantity('${item.id}', -${item.qty})">
          <span class="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  `).join("");
}

export function clearSelection() {
  if (confirm("Are you sure you want to clear your current bespoke dish selection?")) {
    state.dishes = {};
    saveState(state);
    updateCartCounters();
    renderStep2Dishes();
    renderDrawerItems();
    if (state.step === 6) renderStep6Review();
    showToast("Selection cleared.");
  }
}

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
export function initApp() {
  renderCuisinesGrid();
  renderOccasionsGrid();
  renderGuestDisplay();
  populateEventDetailsForm();
  updateCartCounters();
  goToStep(state.step || 1);

  // Set min event date to today
  const dateInput = document.getElementById("event-date-input");
  if (dateInput) {
    const todayStr = new Date().toISOString().split("T")[0];
    dateInput.min = todayStr;
    dateInput.addEventListener("change", (e) => {
      state.eventDetails.date = e.target.value;
      saveState(state);
    });
  }

  // Bind location input listener
  const locationInput = document.getElementById("event-location-input");
  if (locationInput) {
    locationInput.addEventListener("input", (e) => {
      state.eventDetails.location = e.target.value;
      saveState(state);
    });
  }

  // Bind time select listener
  const timeSelect = document.getElementById("event-time-select");
  if (timeSelect) {
    timeSelect.addEventListener("change", (e) => {
      state.eventDetails.time = e.target.value;
      saveState(state);
    });
  }

  // Bind special requests listener
  const specialInput = document.getElementById("event-special-input");
  if (specialInput) {
    specialInput.addEventListener("input", (e) => {
      state.eventDetails.specialRequests = e.target.value;
      saveState(state);
    });
  }

  // Dietary options listeners
  ["jain", "vegan", "gf", "nut"].forEach(key => {
    const el = document.getElementById(`diet-opt-${key}`);
    if (el) {
      el.addEventListener("change", () => {
        state.eventDetails.dietary = {
          jain: document.getElementById("diet-opt-jain")?.checked || false,
          vegan: document.getElementById("diet-opt-vegan")?.checked || false,
          glutenFree: document.getElementById("diet-opt-gf")?.checked || false,
          nutFree: document.getElementById("diet-opt-nut")?.checked || false
        };
        saveState(state);
      });
    }
  });
}

// Expose API to window for inline onclick attributes
window.vtChefs = {
  switchTab,
  goToStep,
  toggleCuisineSelection,
  updateDishQuantity,
  setDishCategoryFilter,
  setDishCuisineFilter,
  applyDietFilter,
  onDishSearchInput,
  clearDishSearch,
  selectOccasion,
  updateGuestCount,
  setGuestQuickOption,
  handleBookingSubmission,
  resetAfterBooking,
  toggleDrawer,
  clearSelection
};

// Auto init on DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
