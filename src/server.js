require('dotenv').config()

const express = require('express')
const connectDb = require('./database/connectDb')
const app = express()
const port = process.env.PORT || 3000

connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})