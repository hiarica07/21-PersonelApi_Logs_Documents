"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Middlewares:

app.use(express.json())
require('express-async-errors')

// Session-Cookies
const session = require('cookie-session');
app.use(session({
    secret: process.env.SECRET_KEY,
    // secure: true, //  only sent over HTTPS
    // httpOnly: true // not accessible via JavaScript
}))

/* ------------------------------------------------------- *

// LOGGER
// npm i morgan
// https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan')

// app.use(morgan('tiny'))
// app.use(morgan('short'))
// app.use(morgan('dev'))
// app.use(morgan('common'))
// app.use(morgan('combined'))
// Custom Log:
// app.use(morgan('TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'))

// Write to File
// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a+' })
// }))

// Write to file - Day to day:
const fs = require('node:fs')
const now = new Date()
// console.log(typeof now);
const today = now.toISOString().split('T')[0]
// console.log(today);
app.use(morgan('TIME=":date[iso]" - URL=":url" - Method=":method" - IP=":remote-addr" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}))

/* ------------------------------------------------------- */

// DOCUMENTATION:
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express


// JSON:
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')

app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true }
}))

// Redoc
const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title:'Redoc UI' }))


/* ------------------------------------------------------- */

// Morgan logger:
// app.use(require('./src/middlewares/logger'))

// Authentication
app.use(require('./src/middlewares/authentication'))

// Query Handler
app.use(require('./src/middlewares/queryHandler'))

// DB connection:
require('./src/configs/dbConnection')


/* ------------------------------------------------------- */
// Routes:

// main 
app.all('/', (req, res) => {
    res.send({
        message: 'WELCOME TO PERSONNEL API',
        // isLogin: req.session.id ? true : false,
        // session: req.session
        isLogin: req.user ? true : false,
        user: req.user
    })
})

// auth
app.use('/auth', require('./src/routes/auth'))

// token
app.use('/tokens', require('./src/routes/token'))

// department
app.use('/departments', require('./src/routes/department'))

// personnel
app.use('/personnels', require('./src/routes/personnel'))

// Not Found
app.use('*', (req, res) => {

    res.status(404).send({
        error: true,
        message: "This route is not found !"
    })
})



// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization : Run it only once.
// require('./src/helpers/sync')()
