import {
  EditOutlined,
  AddLocationOutlined,
  EventOutlined
} from "@mui/icons-material";
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
  Snackbar
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { fetchCourts } from "api/courts";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: ("../assets/location.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
  
const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState(""); // post content 
  const [selectedCourt, setSelectedCourt] = useState(""); // selected court
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date and time
  const [courts, setCourts] = useState([]); // list of courts
  const { palette } = useTheme(); // our colors
  const { _id } = useSelector((state) => state.user); // send it to the Back
  const token = useSelector((state) => state.token);
  const [showMap, setShowMap] = useState(false); // map to show
  const [selectedCourtOnMap, setSelectedCourtOnMap] = useState(null); //selected courts on map
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
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

      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Map Toggle Button */}

      <Box sx={{padding: "1rem 0rem"}}>
        <Button onClick={toggleMap}>
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      {/* Leaflet Map */}
      {showMap && (
        <MapContainer
          center={[32.794044, 34.989571]} // Set the initial map center coordinates
          zoom={12} // Set the initial zoom level
          style={{ width: "100%", height: "400px", marginTop: "1rem" }}
        >
            {/* Conditionally render the TileLayer based on dark mode */}
            <TileLayer
              url={
                darkMode
                  ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                  : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              }
            />

          {/* Render markers for each court */}
          {courts.map((court) => (
            <Marker
              key={court._id}
              position={[court.latitude, court.longitude]} // Use the actual coordinates of the court
              icon={markerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(court),
              }}
            >
              <Popup>{court.courtName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      </Box>

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
          {selectedCourtInfo && (
            <Box 
            sx={{ 
              padding: "1rem 2rem" 
              }}>
              <Typography variant="subtitle2">Information about court:</Typography>
              <Typography>Ground type: {selectedCourtInfo.ground}</Typography>
              <Typography>Facilities: {selectedCourtInfo.facilities.join(", ")}</Typography>
              <Typography>Working Hours: from {selectedCourtInfo.startTime} till {selectedCourtInfo.endTime}</Typography>
            </Box>
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
          
      {/* snackbar to open when post was created successfully  */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </WidgetWrapper>
  );
};

export default MyPostWidget;