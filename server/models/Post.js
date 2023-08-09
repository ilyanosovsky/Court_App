import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        //from USER
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        level: String,
        userPicturePath: String,

        //from COURT
        courtId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        location: String,
        courtPicturePath: String,

        //from POST
        dateAndTime: {
            type: Date,
            required: true,
        },
        description: String,
        participants: {
            type: Array,
            default: [],
        },
        likes: {
            type: Map,
            of: Boolean,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;