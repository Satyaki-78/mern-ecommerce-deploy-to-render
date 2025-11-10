import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";


const initialFormData = {
  orderStatus: ''
}

function AdminOrdersDetailsView({ orderDetails }) {

  const [formData, setFormData] = useState(initialFormData)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { toast } = useToast()

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

  function handleUpdateStatus(event) {
    event.preventDefault()
    const { orderStatus } = formData;
    dispatch(updateOrderStatus({
      id: orderDetails?._id,
      orderStatus
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData)
        toast({ title: data?.payload?.message })
      }
    })
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[97vh] overflow-y-auto p-6 rounded-xl">
      <div className="grid gap-3">
        <Card className="p-3 mt-5 border-black">
          <div className="grid gap-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">Order ID</p>
              <Label>
                {orderDetails?._id}
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between gap-2">
              <p className="font-medium">Date</p>
              <Label>
                {new Date(orderDetails?.orderDate).toLocaleDateString()}
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between gap-2">
              <p className="font-medium">Price</p>
              <Label>
                $ {orderDetails?.totalAmount}
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between gap-2">
              <p className="font-medium">Payment method</p>
              <Label className="capitalize">
                {orderDetails?.paymentMethod}
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between gap-2">
              <p className="font-medium">Payment status</p>
              <Label className="capitalize">
                {orderDetails?.paymentStatus}
              </Label>
            </div>
            <div className="flex mt-2 items-center justify-between gap-2">
              <p className="font-medium">Order Status</p>
              <Label className="capitalize">
                <Badge
                  className={`py-1 px-2 rounded-full text-white 
                    ${getOrderStatusColor(orderDetails?.orderStatus)}`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
        </Card>
        <Card className="p-3 border-black">
          <div className="grid gap-2">
            <div className="grid gap-2">
              <div className="font-bold text-center">Order Details</div>
              <Separator />
              <ul className="grid gap-1 max-h-40 overflow-y-auto pr-2">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                  orderDetails?.cartItems.map(cartItem => (
                    <li className="flex justify-between items-center py-1">
                      <span className="text-gray-900">
                        {cartItem?.title}
                        <span className="font-normal text-gray-700 text-base ml-1">× {cartItem?.quantity}</span>
                      </span>
                      <span className="font-medium text-gray-900">${cartItem?.price}</span>
                    </li>
                  ))
                  : null
                }
              </ul>
            </div>
          </div>
        </Card>
        <Card className="p-3 border-black">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-bold text-center">Shipping Info</div>
              <Separator />
              <div className="grid gap-0.5 text-muted-foreground">
                {
                  orderDetails?.addressInfo ?
                    <div className="flex flex-col">
                      <p className="flex justify-between"><strong>Name: </strong> {user?.userName}</p>
                      <p className="flex justify-between"><strong>Address: </strong> {orderDetails?.addressInfo.address}</p>
                      <p className="flex justify-between"><strong>City: </strong> {orderDetails?.addressInfo.city}</p>
                      <p className="flex justify-between"><strong>Pincode: </strong> {orderDetails?.addressInfo.pincode}</p>
                      <p className="flex justify-between"><strong>Phone: </strong> {orderDetails?.addressInfo.phone}</p>
                      <p className="flex justify-between"><strong>Notes: </strong> {orderDetails?.addressInfo.notes}</p>
                    </div>
                    : <p className="text-sm text-gray-500 italic">No shipping address available.</p>
                }
              </div>
            </div>
          </div>
        </Card>
        <div>
          <CommonForm
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
            formControls={[
              {
                label: 'Order Status',
                name: 'orderStatus',
                componentType: 'select',
                placeholder: 'Select order status',
                options: [
                  { id: 'pending', label: 'Pending' },
                  { id: 'inProcess', label: 'In Process' },
                  { id: 'inShipping', label: 'In Shipping' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'rejected', label: 'Rejected' },
                ]
              }
            ]}
          />
        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrdersDetailsView;