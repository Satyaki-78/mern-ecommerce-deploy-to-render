import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, deleteFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function AdminDashboard() {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch()
  const { featureImageList } = useSelector(state => state.commonFeature)
  const { toast } = useToast()

  function handleUploadFeatureImage() {
    if (imageFile) {
      dispatch(addFeatureImage(uploadedImageUrl))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(getFeatureImages())
            setImageFile(null)
            toast({ title: 'Image uploaded successfully !' })
          }
        })
    } else {
      toast({
        title: 'No image select. Add an image to upload',
        variant: 'destructive'
      })
      return;
    }
  }

  function handleDeleteFeatureImage() {
    if (featureImageList && featureImageList.length > 0) {
      dispatch(deleteFeatureImages())
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(getFeatureImages())
            toast({ title: 'All images deleted successfully !' })
          }
        })
    } else {
      toast({
        title: 'No images to delete !',
        variant: 'destructive'
      })
      return;
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])



  return (
    <div className="flex flex-col items-center justify-center">
      {/* <h1>Upload Feature Images</h1> */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      />
      <div className="flex gap-4 justify-between">
        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 text-xl"
        >
          Upload
        </Button>
        <Button
          onClick={handleDeleteFeatureImage}
          className="mt-5  text-xl"
        >
          Delete All Images
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full mt-6 rounded-md">
        {
          featureImageList && featureImageList.length > 0 ?
            featureImageList.map(imageItem =>
              <div >
                <Card className="w-full p-1 shadow-lg">
                  <img
                    src={imageItem?.image}
                    alt="Feature Image"
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </Card>
              </div>
            ) : null
        }
      </div>
    </div>
  );
}

export default AdminDashboard;