const { check } = require('express-validator');
const db = require('./../db/models');

const commentValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Title')
        .isLength({ max: 255 })
        .withMessage('Title must not be more than 255 characters long'),
    check('message')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Message')
        .isLength({ max: 30000 }) //Following StackOverflow's recommendation of 30000 characters
        .withMessage('Message must not be more than 30000 characters long')
]

module.exports = {
    commentValidators
}
