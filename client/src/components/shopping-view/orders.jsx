import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";


function ShoppingOrders() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orderList, orderDetails } = useSelector(state => state.shopOrder)

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'inProcess':
        return 'bg-blue-500';
      case 'inShipping':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  function handleFetchOrderDetails(getOrderId) {
    dispatch(getOrderDetails(getOrderId))
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><strong>Order ID</strong></TableHead>
              <TableHead><strong>Order Date</strong></TableHead>
              <TableHead><strong>Order Status</strong></TableHead>
              <TableHead><strong>Order Price</strong></TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ?
                orderList.map(orderItem => (
                  <TableRow>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{new Date(orderItem?.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        className={`py-1 px-2 rounded-full text-white 
                          ${getOrderStatusColor(orderItem?.orderStatus)}`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>$ {orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false)
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
                : <div>No orders</div>
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;