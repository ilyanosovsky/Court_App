import Court from "../models/Court.js";

// CREATE
export const createCourt = async (req, res) => {
    try {
        const { courtName, picturePath, ground, location, facilities, day, startTime, endTime, latitude, longitude} = req.body;
        const newCourt = new Court({
            courtName,
            picturePath,
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