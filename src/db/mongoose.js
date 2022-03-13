const { append } = require('express/lib/response')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://KanfeyShahar:Kanfey123!@clusterkanfeyshahar0.3xwmo.mongodb.net/production-db?retryWrites=true&w=majority', {
    useNewUrlParser: true
})