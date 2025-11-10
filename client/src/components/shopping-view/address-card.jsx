
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";


function AddressCard({
  addressInfo,
  index,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {
  console.log(selectedId);

  return (
    <Card
      onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}
      className={`${selectedId === addressInfo?._id ? 'border-green-600 border-[3px] shadow-lg transition-shadow' : ''} 
       pb-1 bg-muted-foreground/5 cursor-pointer`}
    >
      <CardHeader className="mt-0 mb-0 p-2 rounded">
        <CardTitle className="font-semibold text-lg text-center">
          Address {index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent
        className="grid gap-3 p-3 rounded border-t"
      >
        <Label>Address: <span className="font-normal">{addressInfo?.address}</span></Label>
        <Label>City: <span className="font-normal">{addressInfo?.city}</span></Label>
        <Label>Pincode: <span className="font-normal">{addressInfo?.pincode}</span></Label>
        <Label>Phone: <span className="font-normal">{addressInfo?.phone}</span></Label>
        <Label>Note: <span className="font-normal">{addressInfo?.notes}</span></Label>
      </CardContent>
      {/* <Separator className="h-0.5 bg-gray-700" /> */}
      <CardFooter className="px-3 py-1 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>
          Edit
        </Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;