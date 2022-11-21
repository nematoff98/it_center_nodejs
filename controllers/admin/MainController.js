const { Main } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const HelperFunction = require('../../utils/helperFunctions')
const {ERROR_MESSAGES, FILES_BASE_URL} = require('../../utils/constants')

class MainController {
    async get(req, res) {
        try {
            const mainList = await Main.findAll()
            return res.send(mainList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const {title, description} = req.body
            const {image} = req.files
            const fileName = await HelperFunction.uploadFiles(image)
            if(!fileName) return next(ApiError.internal(ERROR_MESSAGES.unknownError))
            const fullFileUrl = `${FILES_BASE_URL}${fileName}`
            const mainList = await Main.create({title, description, image: fullFileUrl})
            return res.send(mainList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {title, description} = req.body
            const {image} = req.files
            let fileName;
            let fullFileUrl;
            if(image) {
                fileName = await HelperFunction.uploadFiles(image)
                fullFileUrl = `${FILES_BASE_URL}${fileName}`
            }
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let main = await Main.findOne({where: {id}})
            if (!main) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            main.title = title ?? main.title
            main.description = description ?? main.description
            main.image = fullFileUrl ?? main.image
            await main.save()
            return res.send(main)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const main = await Main.findOne({where: {id}})
            if (!main) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await main.destroy({where: {id}})
            return res.send(main)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
