import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, level, location, picturePath }) => {
                return { _id, firstName, lastName, level, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    };
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, level, location, picturePath }) => {
                return { _id, firstName, lastName, level, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// UPDATE user profile information
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, location, level, facebook, telegram } = req.body;

        console.log("Updating user profile for user ID: --->", id);
        console.log("Updated profile data: --->", req.body);

        const user = await User.findByIdAndUpdate(
            id,
            { $set: { firstName, lastName, location, level, facebook, telegram } },
            { new: true }
        );

        res.status(200).json(user);
    } catch (err) {
        console.error("Error updating user profile: --->", err);
        res.status(404).json({ message: err.message });
    }
};

// INCREMENT profile views counter
export const incrementProfileViews = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { $inc: { viewedProfile: 1 } });

        res.status(200).json({ message: "Profile views incremented successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// INCREMENT post impressions counter
export const incrementPostImpressions = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (user) {
            user.impressions += 1;
            await user.save();

            res.status(200).json({ message: "Post impressions incremented successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

