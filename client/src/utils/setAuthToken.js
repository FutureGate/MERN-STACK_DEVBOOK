import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        // 모든 요청에 적용 < 헤더에 권한 설정 >
        axios.defaults.headers.common['Authorization'] = token;

    } else {
        delete axios.defaults.headers.common['Authorization']
    }
};

export default setAuthToken;