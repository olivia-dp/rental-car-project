import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCarsThunk, fetchCarById, getBrands } from "./operations";

const initialState = {
  cars: [],
  brands: [],
  isLoading: false,
  isError: null,
  selectedCar: null,
  page: 1,
  total: 0,
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearCars(state) {
      state.cars = [];
    },
    clearSelectedCar(state) {
      state.selectedCar = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      state.page = 1;
      state.cars = [];
    },
    resetFilters(state) {
      state.filters = {};
      state.page = 1;
      state.cars = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarsThunk.fulfilled, (state, action) => {
        state.cars = [...state.cars, ...action.payload.cars];
        state.total = action.payload.total;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchAllCarsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchAllCarsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export const { clearCars, clearSelectedCar, setPage, setFilters, resetFilters } =
  carsSlice.actions;
export const carsReducer = carsSlice.reducer;
