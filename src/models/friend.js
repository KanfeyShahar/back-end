const mongoose = require('mongoose')


const Friend = mongoose.model('Friend', {
    id: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    center: {
        type: String
    },
    role: {
        type: String
    },
    language: {
        type: Array
    },
    status: {
        type: Boolean
    },
    type: {
        type: String
    },
    driver: {
        type: Boolean
    },
    created_date: {
        type: String
    },
    date_birthday: {
        type: String
    },
    dateEnd: {
        type: String
    }

})

module.exports = Friend