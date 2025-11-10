import { useEffect, useRef, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";


const initialAddressFormData = {
  address: '',
  city: '',
  pincode: '',
  phone: '',
  notes: ''
}

function Address({ setCurrentSelectedAddress, selectedId }) {

  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shopAddress)
  const { toast } = useToast()

  function handleManageAddress(event) {
    event.preventDefault()

    if (addressList.length >= 3 && currentEditedId === null) {
      toast({
        title: 'You cannot add more than 3 addresses',
        variant: 'destructive'
      })
      return;
    }

    currentEditedId !== null ?
      (
        dispatch(editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData
        }))
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id))
              setCurrentEditedId(null)
              setFormData(initialAddressFormData)
              toast({
                title: 'Address updated successfully',
              })
            }
          })
      )
      :
      (
        dispatch(addNewAddress({
          ...formData,
          userId: user?.id
        }))
          .then(data => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id))
              setFormData(initialAddressFormData)
              toast({
                title: 'Address added successfully',
              })
            }
          })
      )
  }

  function handleDeleteAddress(getCurrentAddress) {
    // console.log(getCurrentAddress);
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id }))
      .then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id))
          toast({
            title: 'Address deleted successfully',
          })
        }
      })
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes
    })
    setShowForm(true);
  }

  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key].trim() !== '')
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id))
  }, [dispatch])

  // console.log(addressList);

  return (
    <Card className="">
      <div className="mt-2">
        <p className="text-lg px-4">Your Addresses</p>
        <div className="mb-3 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
            addressList && addressList.length > 0 ?
              addressList.map((singleAddressItem, index) => (
                <AddressCard
                  key={singleAddressItem._id}
                  addressInfo={singleAddressItem}
                  index={index}
                  selectedId={selectedId}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              ))
              : <p className="text-red-400">You don't have any added address!</p>
          }

        </div>
      </div>
      <Separator />
      <CardHeader>
        <CardTitle className="text-xl">
          {currentEditedId !== null ? 'Edit Address' : 'Add New Address'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit this Address' : 'Add this Address'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;