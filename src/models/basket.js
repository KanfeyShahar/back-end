const mongoose = require('mongoose')


const Basket = mongoose.model('Basket', {
    id: {
        type: Number
    },
    serialNumber:{
        type:Number
    },
    id_inventory:{
        type:Number
    },
    code: {
        type: Number
    },
    startDate: {
        type: String
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
    count_real1: {
        type: Number
    },
    count_real2: {
        type: Number
    },
    count_real3: {
        type: Number
    },
    count_real4: {
        type: Number
    },
    count_real5: {
        type: Number
    },
    sum: {
        type: Number
    },
    locked:{
        type: Boolean
    }
})

module.exports = Basket