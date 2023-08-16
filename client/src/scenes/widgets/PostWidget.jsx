import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import CircleIcon from '@mui/icons-material/Circle';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import {
  LocalParkingOutlined,
  ShowerOutlined,
  ChairOutlined,
  WbIncandescentOutlined,
  WcOutlined,
  CheckroomOutlined,
  ShoppingCartOutlined,
  DiningOutlined,
  WifiOutlined,
  LocalHospital,
  FitnessCenterOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button, AvatarGroup, Tooltip } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost, removeParticipant } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  level,
  picturePath,
  userPicturePath,
  likes,
  courtId,
  courtName,
  courtLocation,
  dateAndTime,
  courtPicturePath,
  participants,
  selectedCourt, // Receive the selectedCourt prop
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath); // Get the logged-in user's picture path
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const impressionsCount = useSelector((state) => state.auth.impressionsCount);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/posts/${postId}/like`, 
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
  
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const joinMatch = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/posts/${postId}/join`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error joining match:", error);
    }
  };

  const cancelMatch = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/posts/${postId}/cancel`, // Use the new endpoint for cancellation
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
  
      if (response.ok) {
        // Dispatch the new action to remove the logged-in user from participants
        dispatch(removeParticipant({ postId, participant: loggedInUserId }));
      } else {
        console.error("Failed to cancel the match.");
      }
    } catch (error) {
      console.error("Error canceling match:", error);
    }
  };

  const isUserJoined = participants.includes(loggedInUserId);

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={level}
        userPicturePath={postUserId === loggedInUserId ? loggedInUserPicturePath : userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {courtPicturePath && (
        <img
          width="100%"
          height="auto"
          alt="court"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${BASE_URL}/assets/${courtPicturePath}`}
        />
      )}
            {/* Court Info */}
      <FlexBetween mt="1rem">
        <Box>
          <Typography variant="subtitle1">{courtName}</Typography>
          <Typography variant="body2" color={main}>
            Court location: {courtLocation}
          </Typography>
        </Box>
        <Box>
          {/* INFO about court ICONS */}
          <FlexBetween>
            {/* Ground type */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Ground type" arrow placement="top">
                {selectedCourt.ground === "grass" && (
                  <CircleIcon sx={{ color: "green", marginRight: "0.5rem" }} />
                )}
                {selectedCourt.ground === "clay" && (
                  <CircleIcon sx={{ color: "orange", marginRight: "0.5rem" }} />
                )}
                {selectedCourt.ground === "hard" && (
                  <CircleIcon sx={{ color: "blue", marginRight: "0.5rem" }} />
                )}
              </Tooltip>
            </Box>

            {/* Facilities */}
            {selectedCourt.facilities &&
              selectedCourt.facilities.length > 0 && (
                <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                  {selectedCourt.facilities.map((facility) => (
                    <Tooltip key={facility} title={facility} arrow placement="top">
                      {facility === "parking" ? (
                        <LocalParkingOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "shower" ? (
                        <ShowerOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "seats" ? (
                        <ChairOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "light" ? (
                        <WbIncandescentOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "WC" ? (
                        <WcOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "locker" ? (
                        <CheckroomOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "shop" ? (
                        <ShoppingCartOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "cafe" ? (
                        <DiningOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "wifi" ? (
                        <WifiOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "doctor" ? (
                        <LocalHospital sx={{ marginRight: "0.5rem" }} />
                      ) : facility === "gym" ? (
                        <FitnessCenterOutlined sx={{ marginRight: "0.5rem" }} />
                      ) : (
                        // Default case if facility is not parking or shower
                        `${facility}, `
                      )}
                    </Tooltip>
                  ))}
                  </Typography>
              )}

            {/* Working hours */}
            <Tooltip
              title={`Working hours: ${selectedCourt.startTime} -> ${selectedCourt.endTime}`}
              arrow
              placement="top"
            >
              <ScheduleOutlinedIcon sx={{ marginRight: "0.5rem" }} />
            </Tooltip>
          </FlexBetween>
        </Box>

      </FlexBetween>
            {/* Date and Join Button */}
      <FlexBetween mt="1rem">
        <Typography variant="body2" color={main}>
          Date of the Match: {new Date(dateAndTime).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Typography>
        {participants.length > 0 && (
          <FlexBetween mt="0.5rem">
            <AvatarGroup max={4} spacing="small">
              {participants.slice(0, 4).map((participantId) => (
                <UserImage
                  key={participantId}
                  image={participantId === loggedInUserId ? loggedInUserPicturePath : userPicturePath}
                  size="30px"
                  tooltip={participantId === loggedInUserId ? "You" : "Participant"}
                />
              ))}
            </AvatarGroup>
          </FlexBetween>
        )}

      </FlexBetween>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>
        {isUserJoined ? (
          <FlexBetween>
            <Button
              onClick={cancelMatch}
              variant="outlined"
              sx={{ borderColor: "red", color: "red" }}
            >
              Cancel
            </Button>
          </FlexBetween>
        ) : (
          // Display "Join Match" button only if it's not your own post
          !isUserJoined && postUserId !== loggedInUserId && (
            <Button
              onClick={joinMatch}
              variant="outlined"
              sx={{ borderColor: primary, color: primary }}
            >
              Join Match
            </Button>
          )
        )}
      </FlexBetween>

    </WidgetWrapper>
  );
};

export default PostWidget;