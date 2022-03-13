const mongoose = require('mongoose')


const Cars = mongoose.model('Cars', {
    id: {
        type: Number
    },
    idCars: {
        type: String
    },
    typeCar: {
        type: String
    },
    engineCapacity: {
        type: String
    },
    year: {
        type: Number
    },
    kilometer: {
        type: String
    },
    cost: {
        type: String
    },
    carModel: {
        type: String
    },
    testValidity: {
        type: String
    },
    insurance: {
        type: Array
    },
    status: {
        type: Boolean
    },
    dateEnd:{
        type: String
    },
     date_type:{
        type: String
    }
})

module.exports = Cars