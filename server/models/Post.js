import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
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
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;

// import mongoose from "mongoose";

// const PostSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       maxLength: 300,
//     },
//     dateAndTime: {
//       type: Date, // Modify the type to match your needs (e.g., String, Date)
//       required: true,
//     },
//     court: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Court", // Reference to the Court model
//       required: true,
//     },
//     picturePath: {
//       type: String,
//       default: "",
//     },
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Post = mongoose.model("Post", PostSchema);
// export default Post;