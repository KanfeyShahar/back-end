const mongoose = require('mongoose')


const Product = mongoose.model('Product', {
    code: {
        type: Number
    },
    name: {
        type: String
    },
    productNote: {
        type: String
    },
    manufacture: {
        type: String
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    price: {
        type: Number
    },
    count:{
        type: String
    }

})

module.exports = Product