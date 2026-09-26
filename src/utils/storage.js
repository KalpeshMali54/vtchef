/**
 * VT CHEFS — State Storage & Persistence Utility
 * Safely persists wizard state in localStorage
 */

const STORAGE_KEY = "vt_chefs_create_menu_state_v1";

export const DEFAULT_STATE = {
  activeTab: "create-menu", // "home" | "cuisines" | "create-menu" | "our-story"
  step: 1, // 1 through 6
  selectedCuisines: ["gujarati"], // Default starting cuisine
  dishes: {}, // { [dishId]: { id, name, cuisineId, qty: number, priceInfo: string } }
  occasion: "",
  guests: 10,
  eventDetails: {
    date: "",
    time: "",
    location: "",
    dietary: {
      jain: false,
      vegan: false,
      glutenFree: false,
      nutFree: false
    },
    specialRequests: ""
  },
  submissionStatus: "idle", // "idle" | "loading" | "success" | "error"
  bookingResult: null
};

export function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      eventDetails: {
        ...DEFAULT_STATE.eventDetails,
        ...(parsed.eventDetails || {}),
        dietary: {
          ...DEFAULT_STATE.eventDetails.dietary,
          ...(parsed.eventDetails?.dietary || {})
        }
      }
    };
  } catch (err) {
    console.warn("Could not load state from localStorage:", err);
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Could not save state to localStorage:", err);
  }
}

export function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Could not clear state from localStorage:", err);
  }
}
