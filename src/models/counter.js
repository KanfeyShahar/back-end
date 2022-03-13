const mongoose = require('mongoose')


const Counter = mongoose.model('Counter', {
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
    }

})

module.exports = Counter