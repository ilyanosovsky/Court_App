import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setCourts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, postId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); //grab a store of posts
  const courts = useSelector((state) => state.courts);
  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getCourts = async () => {
    const response = await fetch(`${BASE_URL}/courts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setCourts({ courts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${BASE_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
      getCourts();
    } else {
      getPosts();
      getCourts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const reversedPosts = [...posts].reverse();

  return (
    <>
      {reversedPosts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          level,
          picturePath,
          userPicturePath,
          courtId,
          courtPicturePath,
          location,
          dateAndTime,
          participants,
          likes,
        }) => {

          const selectedCourt = courts.find(court => court._id === courtId);
          if (!selectedCourt) {
            return null; // If court not found, skip rendering
          }

          return (
          <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          level={level}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          courtId={courtId}
          courtName={selectedCourt.courtName}
          courtPicturePath={courtPicturePath}
          courtLocation={location}
          dateAndTime={dateAndTime}
          participants={participants}
          likes={likes}
          />
        )}
      )}
    </>
  );
};

export default PostsWidget;