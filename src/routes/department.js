"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, delete: deleteDepartment, personnels } = require('../controllers/department')
const { isLogin, isAdmin, isAdminOrLead} = require('../middlewares/permissions')

// URL : /departments

router.route('/')
    .get(isLogin, list)
    .post(isAdmin, create)

router.route('/:id')
    .get(isLogin, read)
    .put(isAdmin, update)
    .patch(isAdmin, update)
    .delete(isAdmin, deleteDepartment)

router.get('/:id/personnels',isAdminOrLead, personnels)

/* ------------------------------------------------------- */
module.exports = router