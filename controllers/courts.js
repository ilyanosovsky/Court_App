import Court from "../models/Court.js";
import fs from 'fs';
import cloudinary from 'cloudinary';

// CREATE
export const createCourt = async (req, res) => {
    try {
        const { courtName, picturePath, ground, location, facilities, day, startTime, endTime, latitude, longitude} = req.body;

        // Upload the image to Cloudinary
        let result;
        try {
            result = await cloudinary.uploader.upload(req.file.path);
        } catch (error) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
        }

        // Delete the temporary file
        fs.unlinkSync(req.file.path);

        const newCourt = new Court({
            courtName,
            picturePath: result.secure_url,
            ground,
            location,
            facilities,
            day,
            startTime,
            endTime,
            latitude,
            longitude
        });
        await newCourt.save(); //save the court

        const court = await Court.find();
        res.status(201).json(court);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
};

// READ
export const getFeedCourts = async (req, res) => {
    try {
        const court = await Court.find();
        res.status(200).json(court);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

export const getCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const court = await Court.findById(id);
        res.status(200).json(court);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getPostCourt = async (req, res) => {
    try {
        const { postId } = req.params;
        const court = await Court.find({ postId });
        res.status(200).json(court);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};