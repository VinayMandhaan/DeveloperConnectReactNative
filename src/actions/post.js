import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  POST_FAIL,
  POST_SUCCESS,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import Toast from 'react-native-simple-toast';

//Add Post
export const addPost = ({text}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
  };
  console.warn('POST CREATEDs');
  const body = JSON.stringify({text});
  try {
    const res = await axios.post(
      'http://192.168.1.108:5000/api/post',
      body,
      config,
    );
    // console.warn('POST CREATED');
    Toast.show("Post Created", Toast.SHORT)
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    
    dispatch(getPosts())
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//add Like
export const addLike = id => async dispatch => {
  try {
    const headers={
        'Content-Type' : 'application/json',
        'x-auth-token' : await AsyncStorage.getItem('token')
    }
    const URL = `http://192.168.1.108:5000/api/post/like/${id}`
    console.warn(URL)
    console.warn(await AsyncStorage.getItem('token'))
    const res = await axios({
        method: 'put',
        url: URL,
        headers: {'x-auth-token': await AsyncStorage.getItem("token")},
    })
    // console.warn('ADDED LIKE');
    Toast.show("Post Liked", Toast.SHORT)
    dispatch({
      type: UPDATE_LIKE,
      payload: {id, likes: res.data},
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Delete Post
export const deletePost = id => async dispatch => {
  try {
    const headers = {
      'x-auth-token': await AsyncStorage.getItem('token'),
    };
    const res = await axios.delete(
      `http://192.168.1.108:5000/api/post/${id}`,
      {headers: headers},
    );
    // console.warn('Deleted');
    Toast.show("Post Deleted", Toast.SHORT)
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Get all posts
export const getPosts = () => async dispatch => {
  try {
    const headers = {
      'x-auth-token': await AsyncStorage.getItem('token'),
    };
    const res = await axios.get('http://192.168.1.108:5000/api/post', {
      headers: headers,
    });
    console.warn('Posts Loaded', res.data);
    Toast.show("Posts Loaded", Toast.SHORT)
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Get a single post
export const getPost = id => async dispatch => {
  try {
    const headers = {
      'x-auth-token': await AsyncStorage.getItem('token'),
    };
    const res = await axios.get(`http://192.168.1.108:5000/api/post/${id}`, {
      headers: headers,
    });
    // console.warn('Single Posts', res.data);
    Toast.show("Post", Toast.SHORT)
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Unlike
export const unLike = id => async dispatch => {
  try {
    const headers = {
      'x-auth-token': await AsyncStorage.getItem('token'),
    };
    const URL = `http://192.168.1.108:5000/api/post/unlike/${id}`
    console.warn(URL)
    console.warn(await AsyncStorage.getItem('token'))
    const res = await axios({
        method: 'put',
        url: URL,
        headers: {'x-auth-token': await AsyncStorage.getItem("token")},
    })
    // console.warn("POST UNLIKED")
    Toast.show("Post Unliked", Toast.SHORT)
    dispatch({
      type: UPDATE_LIKE,
      payload: res.data,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Add Comment
export const addComment = (postId, {text}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
  };
  const body = JSON.stringify({text});
  try {
    const res = await axios.post(
      `http://192.168.1.108:5000/api/post/comment/${postId}`,
      body,
      config,
    );
    // console.warn('COMMENT ADDED');
    Toast.show("Comment Added", Toast.SHORT)
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//Delete Comment
export const deleteComment = (id, commentId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': await AsyncStorage.getItem('token'),
    },
  };
  // console.warn("POST ID", id)
  // console.warn("CommentId", commentId)
  try {
    const res = await axios.delete(
      `http://192.168.1.108:5000/api/post/comment/${id}/${commentId}`,
      config,
    );
    // console.warn('COMMENT REMOVED');
    Toast.show("Comment Deleted", Toast.SHORT)
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    Toast.show("Error", Toast.SHORT)
    console.warn(err.msg);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

