const { Contact } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const HelperFunction = require("../../utils/helperFunctions");
const FormError = require("../../error/FormError");
const {FILES_BASE_URL, ERROR_MESSAGES} = require('../../utils/constants')

class ContactController {
    async get(req, res) {
        try {
            const contactList = await Contact.findAll()
            return res.send(contactList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body
            const {logo} = req.files
            body.logo = logo
            const validateBody = FormError(body, ['phone'])
            if(validateBody) return next(ApiError.formError(validateBody))
            const fileName = await HelperFunction.uploadFiles(logo)
            if(!fileName) return next(ApiError.internal(ERROR_MESSAGES.unknownError))
            const fullFileUrl = `${FILES_BASE_URL}${fileName}`
            const contactList = await Contact.create({logo: fullFileUrl, phone: body.phone})
            return res.send(contactList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {phone} = req.body
            const {logo} = req.files
            const fileName = await HelperFunction.uploadFiles(logo)
            let fullFileUrl;
            if(fileName) fullFileUrl = `${FILES_BASE_URL}${fileName}`
            const {id} = req.params
            if (!id) return next(ApiError.badRequest('Id not`g`ri kiritilgan'))
            const contact = await Contact.findOne({where: {id}})
            if (!contact) return next(ApiError.badRequest('Id not`g`ri kiritilgan'))
            contact.logo = fullFileUrl ?? contact.logo
            contact.phone = phone ?? contact.phone
            await contact.save()
            return res.send(contact)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest('Id not`g`ri kiritilgan'))
            const contact = await Contact.findOne({where: {id}})
            if (!contact) return next(ApiError.badRequest('Id not`g`ri kiritilgan'))
            await contact.destroy({where: {id}})
            return res.send(contact)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new ContactController()
