import {
    EditOutlined,
    AddLocationOutlined,
    EventOutlined,
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
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  import { fetchCourts } from "api/courts";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [post, setPost] = useState(""); // post content 
    const [selectedCourt, setSelectedCourt] = useState(""); // selected court
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date and time
    const [courts, setCourts] = useState([]); // list of courts
    const { palette } = useTheme(); // our colors
    const { _id, firstName, lastName, level } = useSelector((state) => state.user); // send it to the Back
    const token = useSelector((state) => state.token);
    // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    // const mediumMain = palette.neutral.mediumMain;
    // const medium = palette.neutral.medium;

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
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("courtId", selectedCourt);
      formData.append("description", post);
      formData.append("dateAndTime", selectedDate); // Append selected date and time to the form data
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setPost("");
    };
  
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
            <Box>
              <Typography>{selectedCourt}</Typography>              
            </Box>
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
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;