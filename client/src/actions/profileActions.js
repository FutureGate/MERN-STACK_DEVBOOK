import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// 현재 사용자의 프로필 얻기
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }))
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile/all')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: {}
        }))
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const createProfile = (profileData, history) => dispatch => {
    
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}


export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

// 계정 삭제 & 프로필 삭제
export const deleteAccount = () => dispatch => {
    if(window.confirm("계정을 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
        console.log("!!");
        axios.delete('/api/users/unregister')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })
            )
            .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
            })
            );
    }
}

// 경력 추가
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}