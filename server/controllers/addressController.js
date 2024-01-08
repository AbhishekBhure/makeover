import Address from "../models/addressModel.js";

export const addAddress = async (req, res, next) => {
  const addressess = new Address(req.body);
  try {
    const data = await addressess.save();
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

//Get All Addressess By User
export const getAddressByUser = async (req, res, next) => {
  const { user } = req.query;
  try {
    const addressess = await Address.find({ user: user });
    res.status(200).json(addressess);
  } catch (error) {
    next(error);
  }
};

//Update Address
export const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedAddress);
  } catch (error) {
    next(error);
  }
};

//Delete Address
export const deleteAddress = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteAddress = await Address.findByIdAndDelete(id);
    res.status(200).json(deleteAddress);
  } catch (error) {
    next(error);
  }
};
