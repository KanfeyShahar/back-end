const mongoose = require('mongoose')


const User = mongoose.model('User', {
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
    email: {
        type: String
    },
    type_permission: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Boolean
    },
    created_date: {
        type: String
    },
    dateEnd: {
        type: String
    },

})

module.exports = User