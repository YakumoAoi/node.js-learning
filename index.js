const express = require('express')
const bodyParser = require('body-parser')
const simpleRouter = require('./router')
const anotherRouter = require('./router-another')

const Router = express.Router()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/simple/', simpleRouter, anotherRouter)

app.use((err, req, res, next) => {
    res.status(401)
    res.json({ code: 0, msg: 'something wrong' })
})

app.listen(8200, function() {
    console.log('the server is started and listened by port 8200 ')
})