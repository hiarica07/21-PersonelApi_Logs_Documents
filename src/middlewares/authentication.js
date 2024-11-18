"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Authentication Control Middleware:

const Token = require('../models/token')

module.exports = async (req, res, next) => {

    req.user = null

    // Authorization: Token ...tokenKey...
    // Authorization: ApiKey ...tokenKey...
    // Authorization: Bearer ...tokenKey...
    // Authorization: Auth ...tokenKey...
    // Authorization: X-API-KEY ...tokenKey...
    // Authorization: x-auth-token ...tokenKey...

    const auth = req.headers.authorization || null

    const tokenKey = auth ? auth.split(' ') : null

    if (tokenKey && tokenKey[0] == "Token") {

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')

        if (tokenData) req.user = tokenData.userId

    }

    next()
}