const Validator = require('validator');
const isEmpty = require('./is-empty');

const ProfileInfoLimit = require('../config/ProfileInfoLimit');

module.exports = function validateEducationInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.school)) {
        errors.school = "교육기관을 입력해주세요."
    }

    if(Validator.isEmpty(data.degree)) {
        errors.degree = "학위를 입력해주세요."
    }

    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "공부한 분야를 입력해주세요."
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = "입학일을 입력해주세요."
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}