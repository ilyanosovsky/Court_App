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
import cloudinary from 'cloudinary';
import helmet from 'helmet';

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

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.openweathermap.org"],
        imgSrc: [
          "'self'", 
          "data:", 
          "https://res.cloudinary.com", // Existing domain for Cloudinary
          "https://tiles.stadiamaps.com" // Add this domain for Leaflet map tiles
        ],
        // ... add other directives as needed ...
      },
    },
  }));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' }); // Temporarily store uploaded files in 'uploads' directory

//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",  upload.single("picture"), verifyToken, createPost);
app.post("/courts",  upload.single("picture"), verifyToken, createCourt); 

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/courts", courtRoutes);

// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' https://api.openweathermap.org;");
//     next();
//   });


// MONGOOSE - MongoDB SetUp
const PORT = process.env.PORT || 3030;
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});