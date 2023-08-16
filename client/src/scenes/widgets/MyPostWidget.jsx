import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import MapWidget from "components/MapWidget";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { fetchCourts } from "api/courts";
import CourtInfoPost from "components/CourtInfoPost";


const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState(""); // post content 
  const [selectedCourt, setSelectedCourt] = useState(""); // selected court
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date and time
  const [courts, setCourts] = useState([]); // list of courts
  const { _id } = useSelector((state) => state.user); // send it to the Back
  const token = useSelector((state) => state.token);
  const [showMap, setShowMap] = useState(false); // map to show
  const [selectedCourtOnMap, setSelectedCourtOnMap] = useState(null); //selected courts on map
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme(); // our colors
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const darkMode = useSelector((state) => state.mode === "dark"); // Get dark mode status from Redux store


  // Fetch the list of courts when the component mounts
  useEffect(() => {
    async function fetchCourtsData() {
      try {
        const courtsData = await fetchCourts();
        setCourts(courtsData);
      } catch (error) {
        console.error("Error fetching courts:", error);
      }
    }

    fetchCourtsData();
  }, []);


  // map set up
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleMarkerClick = (court) => {
    setSelectedCourtOnMap(court);
    setSelectedCourt(court._id); // Automatically select the court in the dropdown
    // toggleMap(); // Close the map after selecting a court
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("courtId", selectedCourt);
    formData.append("description", post);
    formData.append("dateAndTime", selectedDate); // Append selected date and time to the form data

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (response.ok) {
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setPost("");
        setIsSnackbarOpen(true);
        setSnackbarMessage("Post created successfully!");

    } else {
      setSnackbarMessage("Failed to create post.");
    }
  } catch (error) {
    setSnackbarMessage("An error occurred.");
    console.error("Error creating post:", error);
  }
};

  console.log("my post: courts data ->", courts);
  // Find the selected court based on the selectedCourt value
  const selectedCourtInfo = courts.find(court => court._id === selectedCourt);
  
  return (
    <WidgetWrapper>
    {/* user picture and input base */}
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Description of the Match..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* <Divider sx={{ margin: "1.25rem 0" }} /> */}

      <MapWidget
        showMap={showMap}
        toggleMap={toggleMap}
        darkMode={darkMode}
        courts={courts}
        handleMarkerClick={handleMarkerClick}
      />

      <FlexBetween>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "1rem" }}>
          <InputLabel>Select a Court</InputLabel>
          <Select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            label="Select a Court"
          >
            {courts.map((court) => (
              <MenuItem key={court._id} value={court._id}>
                {court.courtName} court; location: {court.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FlexBetween>

      <FlexBetween>
      {/* Date and Time Picker */}
        <TextField
            id="dateAndTime"
            label="Date and Time"
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

        {/* Display selected court information */}
        {selectedCourtInfo ? (
          <CourtInfoPost selectedCourtInfo={selectedCourtInfo} />
        ) : (
          <Typography variant="subtitle1">info about court will be here</Typography>
        )}
      </FlexBetween>

      <FlexBetween> 
          <Box>
      
          </Box>
        <Button
          disabled={!post || !selectedCourt}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Create a Match
        </Button>
      </FlexBetween>
          
      {/* Snackbar to open when post was created successfully */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Adjust the anchor origin as needed
      >
        <Alert
          severity="success"
          onClose={() => setIsSnackbarOpen(false)}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </WidgetWrapper>
  );
};

export default MyPostWidget;