const { CourseInstructor } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const HelperFunction = require('../../utils/helperFunctions')
const {ERROR_MESSAGES, FILES_BASE_URL} = require('../../utils/constants')

class CourseInstructorController {
    async get(req, res) {
        try {
            const courseInstructorList = await CourseInstructor.findAll()
            return res.send(courseInstructorList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const {name, position, level_info, description} = req.body
            const {image} = req.files
            const fileName = await HelperFunction.uploadFiles(image)
            if(!fileName) return next(ApiError.internal(ERROR_MESSAGES.unknownError))
            const fullFileUrl = `${FILES_BASE_URL}${fileName}`
            const courseInstructorList = await CourseInstructor.create({
                name,
                position,
                level_info,
                description,
                image: fullFileUrl
            })
            return res.send(courseInstructorList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {name, position, level_info, description} = req.body
            let image
            if(req.files && req.files.image) {
                image = req.files.image
            }
            let fileName;
            let fullFileUrl;
            if(image) {
                fileName = await HelperFunction.uploadFiles(image)
                fullFileUrl = `${FILES_BASE_URL}${fileName}`
            }
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let courseInstructor = await CourseInstructor.findOne({where: {id}})
            if (!courseInstructor) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            courseInstructor.name = name ?? courseInstructor.name
            courseInstructor.position = position ?? courseInstructor.position
            courseInstructor.level_info = level_info ?? courseInstructor.level_info
            courseInstructor.description = description ?? courseInstructor.description
            courseInstructor.image = fullFileUrl ?? courseInstructor.image
            await courseInstructor.save()
            return res.send(courseInstructor)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const level_info = await CourseInstructor.findOne({where: {id}})
            if (!level_info) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await level_info.destroy({where: {id}})
            return res.send(level_info)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new CourseInstructorController()
