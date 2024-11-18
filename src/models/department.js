"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { Schema, model } = require('mongoose');

const DepartmentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
}, {
    collection: "departments",
    timestamps: true,
})

/* ------------------------------------------------------- */
module.exports = model("Department", DepartmentSchema)
