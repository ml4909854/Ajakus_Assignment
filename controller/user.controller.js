const express = require("express");
const UserModel = require("../model/user.model");
const router = express.Router();

// get All user
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users)
    if (!users.length) {
      return res.status(404).json({ message: "No users found!" });
    }
    res.status(200).json({ message: "Users fetched successfully!", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users!", error: error.message });
  }
});

// get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User fetched successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user!", error: error.message });
  }
});

// add user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;
    if (!firstName || !lastName || !email || !department) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists!" });

    const newUser = new UserModel({ firstName, lastName, email, department });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user!", error: error.message });
  }
});

// update User
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user!", error: error.message });
  }
});

// delete User
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user!", error: error.message });
  }
});

module.exports = router;
