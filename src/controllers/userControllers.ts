import { Request, Response } from 'express';
import UserModel from '../model/userModel';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = new UserModel({ name, email });
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await UserModel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) { // Cast error to any
        res.status(500).json({ error: error.message });
    }
};
