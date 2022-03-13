const mongoose = require('mongoose')


const Hall = mongoose.model('Hall', {
    id: {
        type: Number
    },
    start:{
        type:Object
    },
    end: {
        type:Object
    },
    description: {
        type:String
    },
    title: {
        type:String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    color: {
        type: String
    },
    fullName: {
        type: String
    },
})

module.exports = Hall