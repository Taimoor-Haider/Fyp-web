// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const selectedDatesFromLocalStorage = localStorage.getItem("hotelSelectedDates")
  ? JSON.parse(localStorage.getItem("hotelSelectedDates"))
  : null;

const paymentTypeFromLocalStorage = localStorage.getItem("hotelPaymentType")
  ? JSON.parse(localStorage.getItem("hotelPaymentType"))
  : "";

const numberOfDaysFromLocalStorage = localStorage.getItem("numberOfDays")
  ? Number(JSON.parse(localStorage.getItem("numberOfDays")))
  : 0;

const numberOfRoomsFromLocalStorage = localStorage.getItem("numberOfRooms")
  ? Number(JSON.parse(localStorage.getItem("numberOfRooms")))
  : 0;
// Initial state
const initialState = {
  selectedDates: selectedDatesFromLocalStorage,
  numberOfRooms: numberOfRoomsFromLocalStorage,
  paymentType: paymentTypeFromLocalStorage,
  numberOfDays: numberOfDaysFromLocalStorage,
};

// Create slice
const checkAvailibilitySlice = createSlice({
  name: "checkHotelAvailibility",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.availibleLoading = true;
      state.isAvailible = false;
      state.availibilityError = null;
    },
    setNumberOfRooms: (state, { payload }) => {
      state.numberOfRooms = payload;
    },
    setSelectedDates: (state, { payload }) => {
      state.selectedDates = payload;
    },
    setPaymentType: (state, { payload }) => {
      state.paymentType = payload;
    },
    setNumberOfDays: (state, { payload }) => {
      state.numberOfDays = payload;
    },
  },
});

// Export actions and reducer
export const {
  setLoading,
  setNumberOfRooms,
  setSelectedDates,
  setPaymentType,
  setNumberOfDays,
} = checkAvailibilitySlice.actions;
export const checkAvailibilitySlector = (state) => state.checkHotelAvailibility;
export default checkAvailibilitySlice.reducer;
export const addSelectedDates = (dates) => async (dispatch) => {
  dispatch(setSelectedDates(dates));
  // Save the dates to local storage
  try {
    localStorage.setItem("hotelSelectedDates", JSON.stringify(dates));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};

export const addNumberOfRooms = (rooms) => async (dispatch) => {
  dispatch(setNumberOfRooms(rooms));
  // Save the dates to local storage
  try {
    localStorage.setItem("numberOfRooms", JSON.stringify(rooms));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};

export const addNumbeOfDays = (days) => async (dispatch) => {
  dispatch(setNumberOfDays(days));
  // Save the dates to local storage
  try {
    localStorage.setItem("numberOfDays", JSON.stringify(days));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
export const addPaymentTypes = (payments) => async (dispatch) => {
  dispatch(setPaymentType(payments));
  // Save the dates to local storage
  try {
    localStorage.setItem("hotelPaymentType", JSON.stringify(payments));
  } catch (error) {
    console.error("Error saving dates to local storage:", error);
  }
};
