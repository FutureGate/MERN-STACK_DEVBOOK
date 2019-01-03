const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    
    if(!Validator.isEmail(data.email)) {
        errors.email = "이메일 주소가 유효하지 않습니다.";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "이메일을 입력하세요.";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "비밀번호를 입력하세요.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}