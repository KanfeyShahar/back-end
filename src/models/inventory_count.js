const mongoose = require('mongoose')


const Inventory_count = mongoose.model('Inventory_count', {
    id: {
        type: Number
    },
    id_number: {
        type: Number
    },
    startDate: {
        type: String
    },
    code: {
        type: Number
    },
    nameProducts: {
        type: String
    },
    center: {
        type: String
    },
    count: {
        type: Number
    },
    count_actual: {
        type: String
    },
    endDate: {
        type: String
    },
    remarks: {
        type: String
    }
})

module.exports = Inventory_count