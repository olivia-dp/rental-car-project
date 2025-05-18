import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const carAPI = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchAllCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async ({ page, limit = 12, filters = {} }, thunkAPI) => {
    try {
      const cleanedFilters = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );

      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...cleanedFilters,
      });

      const response = await carAPI.get(`/cars?${params.toString()}`);
      const data = response.data;

      return {
        cars: data.cars,
        total: data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchById",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await carAPI.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBrands = createAsyncThunk(
  "cars/brands",
  async (_, thunkApi) => {
    try {
      const { data } = await carAPI.get(`/brands`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
