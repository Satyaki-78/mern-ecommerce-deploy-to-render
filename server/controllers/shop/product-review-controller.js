const Order = require('../../models/Orders')
const Product = require('../../models/Product')
const ProductReview = require('../../models/Review')

const addProductReview = async (req, res) => {
  try {

    const {
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue
    } = req.body;


    const order = await Order.findOne({
      userId,
      'cartItems.productId': productId,
      orderStatus: 'confirmed'
    })

    if (!order) {
      return res.status(403).json({
        success: false,
        message: 'You need to purchase this product to review it'
      })
    }

    const checkExistingReview = await ProductReview.findOne({
      userId: userId,
      productId: productId
    })

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: 'You already reviewed this product. You cannot give any more reviews!'
      })
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue
    })

    await newReview.save();

    const reviews = await ProductReview.find({ productId })
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0);
    const averageReview = totalReviews > 0 ? totalRating / totalReviews : 0;

    await Product.findByIdAndUpdate(productId, { averageReview });

    return res.status(201).json({
      success: true,
      data: newReview
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

const getProductReviews = async (req, res) => {
  try {

    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId })

    res.status(200).json({
      success: true,
      data: reviews
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

module.exports = { addProductReview, getProductReviews }