import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrdersDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch();

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
    dispatch(getOrderDetailsForAdmin(getOrderId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  // console.log(orderList);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [orderDetails])


  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
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
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrdersDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;