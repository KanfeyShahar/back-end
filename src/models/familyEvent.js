const mongoose = require('mongoose')


const FamilyEvents = mongoose.model('FamilyEvents', {
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
    city: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    numberOfPerson: {
        type: String
    },
    language: {
        type: String
    },
    basket_type: {
        type: String
    },
    direction: {
        type: String
    },
    details: {
        type: String
    },
    isDeliverd: {
        type: Boolean
    },
    remarks: {
        type: String
    },
    coordinates: {
        type: Object,
        latitude : {
            type: Number
        },
        longitude: {
            type: Number
        }
    }, 

})

module.exports = FamilyEvents