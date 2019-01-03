const Validator = require('validator');
const isEmpty = require('./is-empty');

const ProfileInfoLimit = require('../config/ProfileInfoLimit');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = "근무한 내용을 입력해주세요."
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = "근무한 회사 명을 입력해주세요."
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = "근무 시작일을 입력해주세요."
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}