require('dotenv').config()

const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {

        })
        console.log('MongoDB connection success')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDb