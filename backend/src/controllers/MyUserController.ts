import { Request, Response } from "express";
import User from "../models/user";

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

const MyUserController = {
  createCurrentUser,
};

export default MyUserController;
