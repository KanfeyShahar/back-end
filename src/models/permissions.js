const mongoose = require('mongoose')


const Permission = mongoose.model('Permissions', {
    id: {
        type: Number
    },
    type_permission: {
        type: String
    },
    hall: {
        type: String
    },
    rooms: {
        type: String
    },
    products: {
        type: String
    },
    orders: {
        type: String
    },
    inventory:{
        type: String
    },
    movements: {
        type: String
    },
    equipments: {
        type: String
    },
    cars: {
        type: String
    },
    monitoring_inventory: {
        type: String
    },
    friends: {
        type: String
    },
    family: {
        type: String
    },
    event: {
        type: String
    },
    monitoring_event: {
        type: String
    },


})

module.exports = Permission