import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  featureImageList: []
}

export const addFeatureImage = createAsyncThunk('/shop/add-feature-image',
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`, { image }
    );
    return response.data;
  }
);

export const getFeatureImages = createAsyncThunk('/shop/get-feature-image',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );
    return response.data;
  }
);

export const deleteFeatureImages = createAsyncThunk('/shop/delete-feature-image',
  async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/common/feature/delete`
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.featureImageList = action.payload.data
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false
        state.featureImageList = []
      })
      // Cases for adding feature images
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.featureImageList = action.payload.data
      })
      .addCase(addFeatureImage.rejected, (state) => {
        state.isLoading = false
        state.featureImageList = []
      })
      // Cases for deleting feature image
      .addCase(deleteFeatureImages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.featureImageList = []
      })
      .addCase(deleteFeatureImages.rejected, (state) => {
        state.isLoading = false
        // state.featureImageList = []
      })
  }
})

export default commonSlice.reducer;