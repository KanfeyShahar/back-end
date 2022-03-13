const mongoose = require('mongoose')


const Store = mongoose.model('Store', {
    store_id: {
        type: Number
    },
    store_name: {
        type: String
    },
    store_code: {
        type: String
    },
    store_address: {
        type: String
    },
    chain_name: {
        type: String
    },
    chain_code: {
        type: String
    },
})

module.exports = Store