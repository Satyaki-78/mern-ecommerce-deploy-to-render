import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accountImage from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address';
import ShoppingOrders from '@/components/shopping-view/orders';


function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImage}
          className="h-full w-full object-cover object-center"
          alt="Account Image" />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue='orders'>
            <TabsList className="mb-4">
              <TabsTrigger
                value="orders"
                className="px-6 py-2 text-base font-medium rounded-md transition-colors
                 data-[state=active]:bg-primary data-[state=active]:text-white
                 data-[state=inactive]:bg-muted data-[state=inactive]:text-black"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-6 py-2 text-base font-medium rounded-md transition-colors
                 data-[state=active]:bg-primary data-[state=active]:text-white
                 data-[state=inactive]:bg-muted data-[state=inactive]:text-black"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;