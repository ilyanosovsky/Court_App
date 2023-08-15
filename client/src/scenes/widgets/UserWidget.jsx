import {
    EditOutlined,
    LocationOnOutlined,
    SportsTennisOutlined,
  } from "@mui/icons-material";
  import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
  import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
  import {
    IconButton,
    Box,
    Typography,
    Divider,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null); //grab the user from backend

    const [editedField, setEditedField] = useState("");
    const [editedValue, setEditedValue] = useState("");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
  
    const getUser = async () => {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleEdit = (field) => {
      setEditedField(field);
      setEditedValue(user[field] || "");
      setIsEditDialogOpen(true);
    };
  
    const handleCloseEditDialog = () => {
      setIsEditDialogOpen(false);
      setEditedField("");
      setEditedValue("");
    };
  
    const handleSaveEdit = async () => {
      try {
        const updatedUserData = {
          [editedField]: editedValue,
          userId: userId
        };
    
        const response = await fetch(`${BASE_URL}/users/profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUserData),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
    
        const data = await response.json();
        console.log("Server response: --->", data);
    
        // Update the local user data with the edited value
        setUser((prevUser) => ({
          ...prevUser,
          [editedField]: editedValue,
        }));
    
        handleCloseEditDialog();
      } catch (error) {
        console.error(error);
        // Handle error, display a message to the user, etc.
      }
    };

    const handleViewProfile = async () => {
      try {

        console.log("Updated user data views: --->");
        // Call the API to increment profile views
        const response = await fetch(`${BASE_URL}/users/${userId}/profile/views`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          // Update the local user data with the incremented value
          setUser((prevUser) => ({
            ...prevUser,
            viewedProfile: prevUser.viewedProfile + 1,
          }));
        }
      } catch (error) {
        console.error(error);
        // Handle error, display a message to the user, etc.
      }
    };    
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      level,
      viewedProfile,
      friends,
      facebook,
      telegram,
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={async () => {
            await handleViewProfile(); // Call the function to increment profile views
            navigate(`/profile/${userId}`);
        }}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <SportsTennisOutlined fontSize="large" sx={{ color: main }} /> 
            <Typography color={medium}>{level}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FacebookOutlinedIcon fontSize="large" sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
              <Typography color={medium}>{facebook || "Add your Facebook link"}</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <EditOutlined sx={{ color: main }} onClick={() => handleEdit("facebook")} />
          </IconButton>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
          <SendOutlinedIcon fontSize="large" sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Telegram
              </Typography>
              <Typography color={medium}>{telegram || "Add your Telegram name"}</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <EditOutlined sx={{ color: main }} onClick={() => handleEdit("telegram")} />
          </IconButton>
        </FlexBetween>
      </Box>

      <Divider />

        {/* FOUTH ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Number of profile views</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile} 
            </Typography>
          </FlexBetween>
        </Box>
  
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit {editedField === "facebook" ? "Facebook" : "Telegram"}</DialogTitle>
        <DialogContent>
          <TextField
            label={editedField === "facebook" ? "Facebook" : "Telegram"}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;