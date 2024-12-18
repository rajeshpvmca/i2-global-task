import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// login API
export const userLogin = createAsyncThunk(
  "user-login",
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://dummyjson.com/user/login`,
        payload,
        config
    );
      localStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("firstName", data?.firstName);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

// signup API
export const userRegister = createAsyncThunk(
  "user-register",
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://dummyjson.com/users/add`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);



