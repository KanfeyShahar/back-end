const mongoose = require('mongoose')


const Rooms = mongoose.model('Rooms', {
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
    resourceId: {
        type: Number
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

module.exports = Rooms