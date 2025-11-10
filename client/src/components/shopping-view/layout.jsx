import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header.jsx";



function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white">
      {/* Common Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <ShoppingHeader />
      </div>
      <main className="flex flex-col w-full mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;