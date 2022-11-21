const { MoreInfo } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const {ERROR_MESSAGES} = require('../../utils/constants')
const HelperFunction = require("../../utils/helperFunctions");

class MainController {
    async get(req, res) {
        try {
            const moreInfoList = await MoreInfo.findAll()
            return res.send(moreInfoList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res) {
        try {
            const {title, description} = req.body
            const {bg_image} = req.files
            const fileName = await HelperFunction.uploadFiles(bg_image)
            const moreInfoList = await MoreInfo.create({title, description, bg_image: fileName})
            return res.send(moreInfoList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {title, description} = req.body
            const {bg_image} = req.files
            let fileName = null
            if(bg_image) fileName = await HelperFunction.uploadFiles(bg_image)
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let moreInfo = await MoreInfo.findOne({where: {id}})
            if (!moreInfo) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            moreInfo.title = title ?? moreInfo.title
            moreInfo.description = description ?? moreInfo.description
            moreInfo.bg_image = fileName ?? moreInfo.bg_image
            await moreInfo.save()
            return res.send(moreInfo)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const moreInfo = await MoreInfo.findOne({where: {id}})
            if (!moreInfo) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await moreInfo.destroy({where: {id}})
            return res.send(moreInfo)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
