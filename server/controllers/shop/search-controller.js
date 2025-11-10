const Product = require('../../models/Product')


const searchProducts = async (req, res) => {
  try {

    const { searchKeyword } = req.params;
    if (!searchKeyword || typeof searchKeyword !== 'string') {
      return res.status(404).json({
        success: false,
        message: 'Search keyword is required and must be in string format'
      })
    }

    const regEx = new RegExp(searchKeyword, 'i')

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ]
    }

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Some error occured'
    })
  }
}

module.exports = { searchProducts }