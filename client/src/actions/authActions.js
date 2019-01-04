import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login User < Get User Token >
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;

            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            // 토큰 디코딩
            const decoded = jwt_decode(token);

            // 현재 사용자 설정
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// 현재 로그인된 사용자 설정
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

// 로그아웃
export const logoutUser = () => dispatch => {
    // 로컬저장소에서 토큰 제거
    localStorage.removeItem('jwtToken');

    // 인증 헤더 제거
    setAuthToken(false);

    // 현재 사용자 {}로 설정 <빈 오브젝트>
    dispatch(setCurrentUser({}));

    window.location.href = "/";
}