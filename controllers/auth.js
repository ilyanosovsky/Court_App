import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

import fs from 'fs';
import cloudinary from 'cloudinary';

//REGISTER USER 
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            level,
            facebook,
            telegram
        } = req.body;

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Upload the image to Cloudinary
        let result;
        try {
            result = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
        }

        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: result.secure_url,
            friends,
            location,
            level,
            facebook,
            telegram,
            viewedProfile: 0, // Initialize profile views to 0
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//LOGGING IN 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch  = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};