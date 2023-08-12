import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema(
  {
    courtName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    facilities: {
      type: Array,
      default: [],
    },
    //working hours
    day: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    
    location: String,
    ground: String,
    // Adding fields for latitude and longitude coordinates
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true } // to add when created, updated
);

const Court = mongoose.model("Court", CourtSchema);

export default Court;
