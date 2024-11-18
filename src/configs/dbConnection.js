"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// MongoDB Connection:

const { connect } = require('mongoose')

module.exports = connect(process.env.MONGOURI || 'mongodb://localhost:27017/personnelAPI')
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))

