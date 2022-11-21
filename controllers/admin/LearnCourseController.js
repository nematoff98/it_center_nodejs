const { LearnCourse, LearnCourseInfos } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const FormError = require('../../error/FormError')
const { ERROR_MESSAGES, FILES_BASE_URL} = require('../../utils/constants')
const HelperFunction = require("../../utils/helperFunctions");

class MainController {
    async get(req, res) {
        try {
            const mainList = await LearnCourse.findAll({include: [{model: LearnCourseInfos, as: 'info'}]})
            return res.send(mainList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body
            const validateBody = FormError(body, ['title', 'description', 'texts'])
            const {image, icons} = req.files
            const fileName = await HelperFunction.uploadFiles(image)
            if(!fileName) return next(ApiError.internal(ERROR_MESSAGES.unknownError))
            const fullFileUrl = `${FILES_BASE_URL}${fileName}`
            if(validateBody) return next(ApiError.formError(validateBody))
            const learnCourseList = await LearnCourse.create({
                title: body.title,
                description: body.description,
                image: fullFileUrl,
            })
            if(!icons || !icons.length) return next(ApiError.internal(ERROR_MESSAGES.unknownError))
            await icons.forEach(async (p, i) => {
                let icon = await HelperFunction.uploadFiles(p)
                await LearnCourseInfos.create({
                    icon: icon ?? '',
                    text: body.texts[i] ?? '',
                    parent_id: learnCourseList.dataValues.id
                })
            })
            return res.send({message: 'success'})
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const body = req.body
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const learnCourseList = await LearnCourse.findOne({where: {id}})
            if(!learnCourseList) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const {image, icons} = req.files
            const fileName = await HelperFunction.uploadFiles(image)
            const fullFileUrl = `${FILES_BASE_URL}${fileName}`
            learnCourseList.title = body.title ?? learnCourseList.title
            learnCourseList.description = body.description ?? learnCourseList.description
            learnCourseList.image = fullFileUrl ?? learnCourseList.image
            await learnCourseList.save()
            if(icons && icons.length) {
                await LearnCourseInfos.destroy({where: {parent_id: learnCourseList.id}})
                await icons.forEach(async (p, i) => {
                    let icon = await HelperFunction.uploadFiles(p)
                    await LearnCourseInfos.create({
                        icon: icon ?? '',
                        text: body.texts[i] ?? '',
                        parent_id: learnCourseList.dataValues.id
                    })
                })
            }
            return res.json({message: 'success'})
        } catch (err) {
            res.status(err.status).json({message: 'success'})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const main = await LearnCourse.findOne({where: {id}})
            if (!main) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await main.destroy({where: {id}})
            return res.send(main)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
