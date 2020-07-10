import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT,
    POST_SUCCESS,
    POST_FAIL,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
  } from '../actions/types';
  import {AsyncStorage} from 'react-native';
  
  const initialState = {
    loading: true,
    posts: [],
    post: null,
    error: {},
  };
  
  export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
      // case POST_SUCCESS:
      //   return {
      //     ...state,
      //     ...payload,
      //     isAuthenticated: true,
      //     loading: false,
      //     userPost: payload,
      //   };
      // case POST_FAIL:
      //   return {
      //     ...state,
      //     isAuthenticated: false,
      //     loading: false,
      //   };
      case POST_SUCCESS:
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false,
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id != payload),
          loading: false,
        };
      case GET_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false,
        };
      case GET_POST:
        return {
          ...state,
          post: payload,
          loading: false,
        };
      case POST_ERROR:
        return {
          ...state,
          ...payload,
          error: payload,
          loading: false,
        };
      case ADD_COMMENT:
        return {
          ...state,
          post: {...state.post, comments: payload},
          loading: false,
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              comment => comment._id !== payload,
            ),
          },
          loading: false,
        };
      case UPDATE_LIKE:
        // console.warn('I AM IN UPDATE LIKEE NOWWWW');
        return {
          ...state,
          posts: state.posts.map(post =>
            post._id === payload.id ? {...post, likes: payload.likes} : post,
          ),
          loading: false,
        };
      default:
        return state;
    }
  }
  