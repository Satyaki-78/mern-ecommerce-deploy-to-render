import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
  isLoading: false,
  reviews: []
}

export const addReview = createAsyncThunk('/shop/review',
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk('/shop/get-search-results',
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for addReview
      .addCase(addReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload.data
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false
        state.reviews = []
      })
      // getReviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  }
})

export default reviewSlice.reducer;