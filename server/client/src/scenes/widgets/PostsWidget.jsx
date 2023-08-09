import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setCourts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, postId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); //grab a store of posts
  const courts = useSelector((state) => state.courts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // const getPostCourt = async () => {
  //   const response = await fetch(`http://localhost:3001/${postId}/court`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   dispatch(setCourts({ posts: data }));
  // };


  useEffect(() => {
    if (isProfile) {
      getUserPosts();
      // getPostCourt();
    } else {
      getPosts();
      // getPostCourt();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("Posts Data before return:", posts);
  console.log("Current post court before return:", courts);

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
          console.log("Current post in return:", courts);
          console.log("Posts Data in return:", posts);
          console.log("User Picture Path", userPicturePath);
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
          // courtName={court.courtName}
          courtPicturePath={courtPicturePath}
          courtLocation={location} // Pass court location
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