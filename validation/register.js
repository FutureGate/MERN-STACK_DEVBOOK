const Validator = require('validator');
const UserInfoLimit = require('../config/UserInfoLimit');

const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: UserInfoLimit.userNameMinLength, max: UserInfoLimit.userNameMaxLength})) {
        errors.name = "이름을 " + UserInfoLimit.userNameMinLength + " ~ " + UserInfoLimit.userNameMaxLength + " 자로 입력해주세요.";
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = "이름을 입력하세요.";
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "이메일 주소가 유효하지 않습니다.";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "이메일을 입력하세요.";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "비밀번호를 입력하세요.";
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "확인 비밀번호를 입력하세요.";
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "비밀번호가 서로 일치하지 않습니다.";
    }

    if(!Validator.isLength(data.password, {min: UserInfoLimit.userPasswordMinLength, max: UserInfoLimit.userPasswordMaxLength})) {
        errors.password = "비밀번호를 " + UserInfoLimit.userPasswordMinLength + " ~ " + UserInfoLimit.userPasswordMaxLength + " 자 내로 입력해주세요.";
    }

    


    return {
        errors,
        isValid: isEmpty(errors)
    }
}