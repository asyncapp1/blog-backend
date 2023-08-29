import user_model from "../models/user_model";
import bcryptjs from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  const allUser = await user_model.find();
  res.status(200).json({ allUser });
};

export const getUserByID = async (req, res, next) => {
  const UserID = req.params.id;

  let user;
  try {
    user = await user_model.findById(UserID);
  } catch (err) {}

  res.status(200).json({ user });
};

export const userSingUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let exesUser;

  try {
    exesUser = await user_model.findOne({ email });
  } catch (err) {
    console.log(`==============> ${err}`);
  }

  if (exesUser) {
    return res
      .status(400)
      .json({ message: "alredy have acc, go on loginPage" });
  }

  const incrptedPass = bcryptjs.hashSync(password);
  const user = new user_model({ name, email, password: incrptedPass });
  try {
    user.save();
  } catch (err) {
    return res.status(500).json({ message: `=-------${err}` });
  }
  return res.status(200).json({ user });
};

export const userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  let exesUser;

  try {
    exesUser = await user_model.findOne({ email });
  } catch (err) {
    console.log(`==============> ${err}`);
  }

  if (!exesUser) {
    return res
      .status(400)
      .json({ message: "you no have acc. yet, go on singup page" });
  }

  const isPasswordCorrect = bcryptjs.compareSync(password, exesUser.password);

  if (isPasswordCorrect) {
    return res.status(200).json({ exesUser });
  } else {
    return res.status(500).json({ message: "your password is not currect" });
  }
};
