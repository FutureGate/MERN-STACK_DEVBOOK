import axios from 'axios';
import { GET_ERRORS, POST_LOADING, GET_POSTS, GET_POST, ADD_POST, DELETE_POST } from './types';

export const addPost = (postData) => dispatch => {
    axios.post('/api/posts/', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());

    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }));
}

export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());

    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null
        }));
}

export const deletePost = (id) => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const addLike = (id, history) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const removeLike = (id, history) => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const addComment = (id, commentData) => dispatch => {
    axios.post(`/api/posts/comment/${id}`, commentData)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const deleteComment = (postID, commentID) => dispatch => {
    axios.delete(`api/posts/comment/${postID}/${commentID}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
}
