const mongoose = require('mongoose')


const Movements = mongoose.model('Movements', {
    id: {
        type: Number
    },
    code:{
        type:Number
    },
    name: {
        type: String
    },
    center: {
        type: String
    },
    type: {
        type: String
    },
    manufacture: {
        type: String
    },
    size: {
        type: String
    },
    count: {
        type: Number
    },
    endDate: {
        type: String
    },
    status: {
        type: String
    },
    created_date: {
        type: String
    }
})

module.exports = Movements