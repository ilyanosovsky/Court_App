import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; //allows to upload files
import { fileURLToPath } from 'url'; //allows to upload files
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import courtRoutes from './routes/courts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { createCourt } from './controllers/courts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Court from './models/Court.js';
import { users, posts } from "./data/index.js"

// CONFIGURATIONS MIDDLEWARE
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //our directory of imges

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}); //how to save files locally 
const upload = multer({storage});

//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/courts", verifyToken, upload.single("picture"), createCourt);

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/courts", courtRoutes);

// MONGOOSE - MongoDB SetUp
const PORT = process.env.PORT || 3030;
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
    //manually enject the info from DATA only one time
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((err) => console.log(`${err} did not connect`));




