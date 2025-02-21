const express = require('express')
const connectDb = require('./database/connectDb')
const routes = require('./routes/route')
const { createUploadsDir } = require('./utils/fileUtils')

const app = express()
const port = process.env.PORT || 3000

connectDb();
createUploadsDir();

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});