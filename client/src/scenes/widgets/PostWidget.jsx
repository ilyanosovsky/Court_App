import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

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
  participants
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath); // Get the logged-in user's picture path
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const [hasJoined, setHasJoined] = useState(participants.includes(loggedInUserId));

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `${BASE_URL}/posts/${postId}/like`, 
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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
      // Handle error
      console.error("Error joining match:", error);
    }
  };

  const cancelMatch = async () => {
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
  
      if (response.ok) {
        // Remove logged-in user from participants and update the post in state
        const updatedParticipants = participants.filter(
          (participant) => participant !== loggedInUserId
        );
  
        // Create an updated post object with the new participants list
        const updatedPost = {
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
          courtPicturePath, // Use the props directly
          participants: updatedParticipants,
        };
  
        dispatch(setPost({ post: updatedPost }));
      } else {
        // Handle unsuccessful cancellation
        console.error("Failed to cancel the match.");
      }
    } catch (error) {
      // Handle error
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
          <Typography variant="subtitle1"> Name: {courtName}</Typography>
          <Typography variant="body2" color={main}>
            Court location: {courtLocation}
          </Typography>
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

        {isUserJoined ? (
          <FlexBetween>
            <UserImage image={loggedInUserPicturePath} size="40px" />
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
      </FlexBetween>

    </WidgetWrapper>
  );
};

export default PostWidget;