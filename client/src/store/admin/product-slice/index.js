import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  productList: []
}

export const addNewProduct = createAsyncThunk('/products/add-new-product',
  async (formData) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk('/products/fetch-all-product',
  async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
    return result?.data;
  }
);

export const editProduct = createAsyncThunk('/products/edit-product',
  async ({ id, formData }) => {
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk('/products/delete-product',
  async (id) => {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
    return result?.data;
  }
);

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.productList = action?.payload?.data
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false
        state.productList = []
      })
  }
})


export default adminProductsSlice.reducer;