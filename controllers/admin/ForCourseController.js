const { ForCourse } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const {ERROR_MESSAGES} = require('../../utils/constants')
class MainController {
    async get(req, res) {
        try {
            const forCourseList = await ForCourse.findAll()
            return res.send(forCourseList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res) {
        try {
            const {title, description} = req.body
            const forCourseList = await ForCourse.create({title, description})
            return res.send(forCourseList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {title, description} = req.body
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let forCourse = await ForCourse.findOne({where: {id}})
            if (!forCourse) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            forCourse.title = title ?? forCourse.title
            forCourse.description = description ?? forCourse.description
            await forCourse.save()
            return res.send(forCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const forCourse = await ForCourse.findOne({where: {id}})
            if (!forCourse) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await forCourse.destroy({where: {id}})
            return res.send(forCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
