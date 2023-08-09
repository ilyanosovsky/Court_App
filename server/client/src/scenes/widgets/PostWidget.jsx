import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { fetchCourts } from "api/courts";

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
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const [courts, setCourts] = useState([]); // list of courts

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
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

    const joinMatch = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/join`,
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
    };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={level}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="court"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${courtPicturePath}`}
        />
      )}
            {/* Court Info */}
      <FlexBetween mt="1rem">
        <Box>
          <Typography variant="subtitle1">{courtName}</Typography>
          <Typography variant="body2" color={main}>
            {courtLocation}
          </Typography>
        </Box>
      </FlexBetween>
            {/* Date and Join Button */}
      <FlexBetween mt="1rem">
        <Typography variant="body2" color={main}>
          Date: {new Date(dateAndTime).toLocaleString()}
        </Typography>
        {!participants.includes(loggedInUserId) && (
          <Button
            onClick={joinMatch}
            variant="outlined"
            sx={{ borderColor: primary, color: primary }}
          >
            Join Match
          </Button>
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


  //   return (
  //     <WidgetWrapper m="2rem 0">
  //       <Friend
  //         friendId={postUserId}
  //         name={name}
  //         subtitle={level}
  //         userPicturePath={userPicturePath}
  //       />
  //       <Typography color={main} sx={{ mt: "1rem" }}>
  //         {description}
  //       </Typography>
  //       {picturePath && (
  //         <img
  //           width="100%"
  //           height="auto"
  //           alt="post"
  //           style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
  //           src={`http://localhost:3001/assets/${picturePath}`}
  //         />
  //       )}
  //       <FlexBetween mt="0.25rem">
  //         <FlexBetween gap="1rem">
  //           <FlexBetween gap="0.3rem">
  //             <IconButton onClick={patchLike}>
  //               {isLiked ? (
  //                 <FavoriteOutlined sx={{ color: primary }} />
  //               ) : (
  //                 <FavoriteBorderOutlined />
  //               )}
  //             </IconButton>
  //             <Typography>{likeCount}</Typography>
  //           </FlexBetween>
  //         </FlexBetween>
  //       </FlexBetween>
  //     </WidgetWrapper>
  //   );
  // };
  
  // export default PostWidget;