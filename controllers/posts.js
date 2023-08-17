import Post from "../models/Post.js";
import User from "../models/User.js";
import Court from "../models/Court.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, courtId, dateAndTime, description } = req.body;
        const user = await User.findById(userId);
        const court = await Court.findById(courtId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            level: user.level,
            userPicturePath: user.picturePath,
            courtId,
            courtName: court.name,
            location: court.location,
            courtPicturePath: court.picturePath,
            dateAndTime,
            description,
            participants: [],
            likes: {},
        });
        await newPost.save(); //save the post

        const post = await Post.find() //grab ALL the posts
        res.status(201).json(post); //return it all
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
};

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

// UPDATE 
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const joinMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      // Find the post by ID and update the participants list
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $addToSet: { participants: userId } }, // Add userId to participants array if not already present
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

  // Remove a participant from a match
export const cancelMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      // Find the post by ID and update the participants list to remove the user
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { participants: userId } },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };