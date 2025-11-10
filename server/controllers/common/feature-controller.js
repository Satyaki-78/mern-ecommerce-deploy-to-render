const Feature = require('../../models/Feature')

const addFeatureImage = async (req, res) => {
  try {

    const { image } = req.body;

    const featureImages = new Feature({
      image
    })

    await featureImages.save()

    res.status(201).json({
      success: true,
      data: featureImages
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

const getFeatureImages = async (req, res) => {
  try {

    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

const deleteFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});
    if (!images) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    await Feature.deleteMany();

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete feature image",
    });
  }
};


module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage }