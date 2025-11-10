const Address = require('../../models/Address')

const addAddress = async (req, res) => {
  try {

    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data provided'
      })
    }

    const newlyCreatedAddress = new Address({
      userId: userId,
      address: address,
      city: city,
      pincode: pincode,
      phone: phone,
      notes: notes
    })

    await newlyCreatedAddress.save()

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occured'
    })
  }
};

const fetchAllAddress = async (req, res) => {
  try {

    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is requried'
      })
    }

    const addressList = await Address.find({ userId })

    res.status(200).json({
      success: true,
      data: addressList
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occured'
    })
  }
};

const editAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: 'User and Address ID required'
      })
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId: userId
      },
      formData,
      { new: true }
    )

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      })
    }

    res.status(200).json({
      success: true,
      data: address
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occured'
    })
  }
};

const deleteAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: 'User and Address ID required'
      })
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId
    })

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error occured'
    })
  }
};


module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress }