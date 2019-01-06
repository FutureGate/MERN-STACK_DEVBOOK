const Validator = require('validator');
const isEmpty = require('./is-empty');

const PostInfoLimit = require('../config/PostInfoLimit');

module.exports = function validatePostInput(data) {
    let errors = {};

    // 각 정보 초기화
    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, {min: PostInfoLimit.postMinLength, max: PostInfoLimit.postMaxLength})) {
        errors.text = "내용은 " + PostInfoLimit.postMaxLength + "자 까지만 작성 가능합니다.";
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = "내용을 입력해주세요.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}