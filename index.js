const express = require('express')
const cors = require('cors')
const connectDatabase = require('./database/db')
const router = require('./routes/routes')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/', router)

const port = 8888

connectDatabase()
.then(()=>{
    app.listen(port, ()=>{
        console.log('listening on port' + port)
    })
})
