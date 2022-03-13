const mongoose = require('mongoose')


const Inventory = mongoose.model('Inventory', {
    id: {
        type: Number
    },
    code: {
        type: Number
    },
    nameProducts: {
        type: String
    },
    type: {
        type: String
    },
    manufacture: {
        type: String
    },
    count: {
        type: Number
    },
    size: {
        type: String
    },
    endDate: {
        type: String
    },
})

module.exports = Inventory