import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  //check if user exists
  //create the user if not
  //return the user object to calling object

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id }); // Finds user with auth0 id from database
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save(); // creating new user in db

    res.status(201).json(newUser.toObject()); //converts to POJO object
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    //console.log("Request body:", req.body);
    const { name, addressLine1, country, city } = req.body; // deconstructing form data
    //console.log("name", name);
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const MyUserController = {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};

export default MyUserController;
