const mongoose = require('mongoose')


const Equipment = mongoose.model('Equipment', {
    id: {
        type: Number
    },
    name_equipment: {
        type: String
    },
    center: {
        type: String
    },
    count: {
        type: String
    },
    remark: {
        type: String
    },
})

module.exports = Equipment