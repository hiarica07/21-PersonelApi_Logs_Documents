"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require('../models/department')


module.exports = {
    list: async (req, res) => {
        /*
        #swagger.tags = ["Departments"]
        #swagger.summary = "List Departments"
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

        const result = await res.getModelList(Department);

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Department),
            result,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Create Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
        //todo check if there is a lead, if it is there make old user lead fieldname false 

        const result = await Department.create(req.body);

        res.status(201).send({
            error: false,
            result,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Single Department"
        */

        const result = await Department.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result,
        });
    },

    //filter, update,options
    // const options = { upsert: true };
    // acknowledged: İşlemin MongoDB tarafından tanındığını gösterir.
    // matchedCount: Filtre kriterleriyle eşleşen belge sayısını belirtir.
    // modifiedCount: Güncellenen belge sayısını belirtir.
    // upsertedId: Eğer upsert kullanıldıysa ve yeni bir belge oluşturulduysa, bu belgenin _id değeri burada yer alır.
    // upsertedCount: upsert işlemi ile kaç belgenin oluşturulduğunu belirtir.

    update: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Update Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
        const result = await Department.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            result,
            new: await Department.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Delete Department"
        */

        //todo if a lead is deleted assign new lead to this department

        const result = await Department.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result,
        });
    },

    personnels: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Personnels of Department"
        */
        const Personnel = require('../models/personnel')

        // const result = await Personnel.find({ departmentId: req.params.id }).populate('departmentId')

        const result = await res.getModelList(Personnel, { departmentId: req.params.id }, 'departmentId')

        res.status(202).send({
            error: false,
            result
        })

    }

    //todo multi delete



};