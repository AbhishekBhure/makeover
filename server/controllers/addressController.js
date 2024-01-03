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
