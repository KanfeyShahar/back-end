const mongoose = require('mongoose')


const Order = mongoose.model('Order', {
    id: {
        type: Number
    },
    totalAmount:{
        type:String
    },
    locked:{
        type:Boolean
    },
    items:{
        type:Object,
       code:{
           type:Number
       },
       name:{
           type:String
       },
       price:{
           type:String
       },
       amount:{
           type:String
       },
       amountActual:{
           type:String
       },
       priceActual:{
           type:String
       },
       Type:{
           type:String
       },
       manufacture:{
        type:String
       },
       productNote:{
           type:String
       },
       size:{
           type:String
       }
    },
    userDate:{
        type:Object,
        id:{
            type:Number
        },
        name:{
            type:String
        },
        center:{
            type:String
        },
        endDate:{
            type:String
        },
        date:{
            type:String
        },
        supplier:{
            type:Boolean
        },
        status:{
            type:Boolean
        },
        endDateActual:{
            type:String
        },
        desciption:{
            type:String
        }
    }
    
})

module.exports = Order