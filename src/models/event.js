const mongoose = require('mongoose')


const Event = mongoose.model('Event', {
    id: {
        type: Number
    },
    name: {
        type: String
    },
    startDate: {
        type: String
    },
    remarks: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: Boolean
    },
    dateEnd: {
        type: String
    },
    basket1:{
        type: Number
    },
    basket2:{
        type: Number
    },
    basket3:{
        type: Number
    },
    basket4:{
        type: Number
    },
    basket5:{
        type: Number
    }

})

module.exports = Event