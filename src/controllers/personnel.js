"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require('../models/personnel')


module.exports = {
    list: async (req, res) => {
        /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "List Personnels"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

        const result = await res.getModelList(Personnel);

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Personnel),
            result,
        });
    },

    create: async (req, res) => {
        /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Create Personnel"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Personnel'
            }
        }
    */
        
        const result = await Personnel.create(req.body);
        res.status(201).send({
            error: false,
            result,
        });
    },

    read: async (req, res) => {
            /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Get Single Personnel"
    */
        
        const result = await Personnel.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result,
        });
    },

    update: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Update Personnel"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Personnel'
            }
        }
    */

        const result = await Personnel.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            result,
            new: await Personnel.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Delete Personnel"
    */
        
        const result = await Personnel.deleteOne({ _id: req.params.id });
        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result,
        });
    },

    //todo multi delete

};