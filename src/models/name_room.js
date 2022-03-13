const mongoose = require('mongoose')


const Resource = mongoose.model('Resource', {
    id: {
        type: Number
    },
    resourceId:{
        type: Number
    },
    resourceTitle:{
        type: String
    },

})

module.exports = Resource