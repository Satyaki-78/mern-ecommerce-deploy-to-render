import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";



function SearchProducts() {

  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearched, setIsSearched] = useState(false);
  const [filters, setFilters] = useState({})
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { searchResults } = useSelector(state => state.shopSearch);
  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(cartItems,'cartItems');
    let getCartItems = cartItems.items || []
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: 'destructive'
          })
          return;
        }
      }
    }
    dispatch(addToCart(
      {
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1
      }
    )).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        dispatch(fetchAllFilteredProducts({ filterParams: 'category:men', sortParams: 'price-lowtohigh' }))
        toast({
          title: 'Product is added to cart !'
        })
      }
    }
    )
  };

  useEffect(() => {
    if (searchKeyword && searchKeyword.trim() !== "" && searchKeyword.trim().length > 0) {
      const delay = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?searchKeyword=${searchKeyword}`));
        dispatch(getSearchResults(searchKeyword));
        setIsSearched(true);
      }, 1000);

      return () => clearTimeout(delay);

    } else {
      setIsSearched(false);
      dispatch(resetSearchResults())
      setSearchParams(new URLSearchParams(`?searchKeyword=${searchKeyword}`));
    }
  }, [searchKeyword])


  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails])


  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full items-center">
          <Input
            value={searchKeyword}
            name="searchKeyword"
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="Search products..."
            className="py-6 border-zinc-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <ShoppingProductTile
              key={item.id || item._id}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          isSearched && (
            <div className="text-3xl font-bold text-center col-span-full mt-10">
              No products found ¯\_(ツ)_/¯
            </div>
          )
        )}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default SearchProducts;