import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
  orderList: [],
  orderDetails: null
}


export const getAllOrdersForAdmin = createAsyncThunk('/order/get-all-orders-for-admin',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk('/order/get-order-details-for-admin',
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk('/order/update-order-status',
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      {
        orderStatus
      }
    );
    return response.data;
  }
);


const AdminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for getting all orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.orderList = action.payload.data
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false
        state.orderList = []
      })
      // Cases for getting order details of one order
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.orderDetails = action.payload.data
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false
        state.orderDetails = null
      })
  }
})

export const { resetOrderDetails } = AdminOrderSlice.actions;

export default AdminOrderSlice.reducer;