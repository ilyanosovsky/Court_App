import mongoose from "mongoose";

// Sub document schema for working hours
const WorkingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

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
    // Using the WorkingHoursSchema sub document for working hours
    workingHours: [WorkingHoursSchema],
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
