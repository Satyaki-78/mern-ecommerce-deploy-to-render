import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
  approvalUrl: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null
}


export const createNewOrder = createAsyncThunk('/order/create-new-order',
  async (orderData) => {

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
      orderData
    )
    return response.data;
  }
);

export const capturePayment = createAsyncThunk('/order/create-new-order',
  async ({ paymentId, payerId, orderId }) => {

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      {
        paymentId, payerId, orderId
      }
    )
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk('/order/get-all-orders',
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk('/order/get-order-details',
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);


const shoppingOrderSlice = createSlice({
  name: 'shoppingOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails: (state, action) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for creating new order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.approvalUrl = action.payload.approvalUrl
        state.orderId = action.payload.orderId
        sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false
        state.approvalUrl = null
        state.approvalUrl = null
      })
      // Cases for getting all orders
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false
        state.orderList = action.payload.data
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false
        state.orderList = []
      })
      // Cases for getting order details of one order
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.orderDetails = action.payload.data
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false
        state.orderDetails = null
      })
  }
})

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;