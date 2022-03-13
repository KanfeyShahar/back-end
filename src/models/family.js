const mongoose = require('mongoose')


const Family = mongoose.model('Family', {
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
    city: {
        type: String
    },
    address: {
        type: String
    },
    floor:{
        type: String
    },
    floor:{
        type: String
    },
    entrance:{
        type:String
    },
    apartment:{
        type:String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    remarks: {
        type: String
    },
    numberOfPerson: {
        type: String
    },
    language: {
        type: String
    },
    status: {
        type: Boolean
    },
    food: {
        type: Boolean
    },
    hot: {
        type: Boolean
    },
    created_date: {
        type: String
    },
    dateEnd: {
        type: String
    }

})

module.exports = Family