import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getFeatureImages } from "@/store/common-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, FootprintsIcon, ShirtIcon, WatchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: FootprintsIcon },
];

const brandWithIcon = [
  { id: 'nike', label: 'Nike', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_nike_principal.jpg' },
  { id: 'adidas', label: 'Adidas', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { id: 'puma', label: 'Puma', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Puma-logo-%28text%29.svg' },
  { id: 'levi', label: "Levi's", icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg' },
  { id: 'zara', label: 'Zara', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Zara_logo_1980.svg' },
  { id: 'h&m', label: 'H&M', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
];


function ShoppingHome() {


  const [currentSlide, setCurrentSlide] = useState(0)
  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { featureImageList } = useSelector(state => state.commonFeature)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart(
      {
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1
      }
    )).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: 'Product is added to cart !'
        })
      }
    }
    )
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails])

  useEffect(() => {
    if (!featureImageList || featureImageList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featureImageList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [featureImageList.length]);


  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(getFeatureImages())
    // console.log(featureImageList, 'featureImageList');
  }, [dispatch, featureImageList])


  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          featureImageList && featureImageList.length > 0 ?
            featureImageList.map((slide, index) =>
              <img
                src={slide.image}
                key={slide._id || index}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000
                  ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : null
        }
        <Button variant="outline" size="icon"
          onClick={() => setCurrentSlide(prevSlide =>
            ((prevSlide - 1 + featureImageList.length) % featureImageList.length)
          )}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon"
          onClick={() => setCurrentSlide(prevSlide =>
            ((prevSlide + 1 + featureImageList.length) % featureImageList.length)
          )}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid gap-4 grid-flow-row auto-rows-fr [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            {
              categoriesWithIcon.map(categoryItem =>
                <Card
                  onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-semibold text-lg">{categoryItem.label}</span>
                  </CardContent>
                </Card>)
            }
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid gap-4 grid-flow-row auto-rows-fr [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            {
              brandWithIcon.map(brandItem =>
                <Card
                  onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img src={brandItem.icon} alt={brandItem.title} className="w-18 h-12 mb-4 text-primary" />
                    <span className="font-semibold text-lg">{brandItem.label}</span>
                  </CardContent>
                </Card>)
            }
          </div>
        </div>
      </section>

      {/* Products List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length > 0 ?
                productList.map(productItem =>
                  <ShoppingProductTile
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />)
                : <p>No products to buy</p>
            }
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;