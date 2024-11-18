"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const { Schema, model } = require("mongoose");


/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "Personnel",
        required: true,
        index: true
    },

    token: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    }

}, {
    collection: 'tokens',
    timestamps: true
})

/* ------------------------------------------------------- */

module.exports = model('Token', TokenSchema)

