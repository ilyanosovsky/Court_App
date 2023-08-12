import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  courts: [], // Add a new field for courts
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //theme: Dark/Light mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //Login
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    //logOut
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    //add Friends
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    //add Player to Match
    addParticipant: (state, action) => {
      const { postId, participant } = action.payload;
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            participants: [...post.participants, participant],
          };
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    //states about Posts
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload.post);
    },
    updatePost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    // Add a new reducer to set courts
    setCourts: (state, action) => {
      state.courts = action.payload.courts;
    },
    // Add a new reducer to add a court
    addCourt: (state, action) => {
      state.courts.push(action.payload.court);
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, addPost, updatePost, setCourts, addCourt, addParticipant, setPost } =
  authSlice.actions;
export default authSlice.reducer;