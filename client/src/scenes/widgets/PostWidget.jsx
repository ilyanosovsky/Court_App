import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { Box, Divider, IconButton, Typography, useTheme, Button, AvatarGroup } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import CourtInfoPost from "components/CourtInfoPost";
// import CourtImagesDisplay from "components/CourtImagesDisplay";
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
  selectedCourtInfo, // Receive the selectedCourtInfo prop
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath); // Get the logged-in user's picture path
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
        `${BASE_URL}/posts/${postId}/cancel`, 
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
          {/* Display court images */}
          {/* {selectedCourtInfo.courtPicturePath && (
          <CourtImagesDisplay
            courtPicturePath={selectedCourtInfo.picturePath}
            BASE_URL={BASE_URL}
          />
           )} */}
      {courtPicturePath && (
        <img
          width="100%"
          height="auto"
          alt="court"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={courtPicturePath} //change here for court pictures of Cloudinary
        />
      )}
            {/* Court Info */}
      <FlexBetween mt="1rem">
        <Box>
          <Typography variant="subtitle1">{courtName}</Typography>
          <Typography variant="body2" color={main}>
            Location: {courtLocation}
          </Typography>
        </Box>
        <Box>
          {/* INFO about court ICONS */}
          <CourtInfoPost selectedCourtInfo={selectedCourtInfo} />
        </Box>
      </FlexBetween>

            {/* Date and Join Button */}
      <FlexBetween mt="1rem">
        <Typography display="flex" variant="body2" color={main}>
          <EventAvailableOutlinedIcon />  {new Date(dateAndTime).toLocaleString(undefined, {
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