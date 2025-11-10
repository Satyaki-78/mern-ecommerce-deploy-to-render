import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";


function UserCartWrapper({ cartItems, setOpenCartSheet }) {

  const navigate = useNavigate()

  // console.log(cartItems,'cartItems');
  const totalCartAmount = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum, currentItem) => sum +
      (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price)
      * currentItem?.quantity, 0)
    : 0

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader className="shrink-0">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1">
        {
          cartItems && cartItems.length > 0 ?
            cartItems.map(item => <UserCartItemsContent cartItem={item} />)
            : null
        }
      </div>
      <div className=" shrink-0 mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            ${totalCartAmount.toFixed(2)}
          </span>
        </div>
        <Button
          onClick={() => {
            navigate('/shop/checkout')
            setOpenCartSheet(false)
          }}
          className="w-full mt-6"
        >Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;