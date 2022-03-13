const mongoose = require('mongoose')


const FriendEvents = mongoose.model('FriendEvents', {
    id: {
        type: Number
    },
    serialNumber:{
        type:Number
    },
    number_id:{
        type: Number
    },
    startDate: {
        type: String
    },
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    phone: {
        type: String
    },
    role_event: {
        type: String
    },
    driver: {
        type: Boolean
    },
    direction: {
        type: String
    },
    remarks: {
        type: String
    },

})

module.exports = FriendEvents