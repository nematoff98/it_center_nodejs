const { HaveCourse } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const {ERROR_MESSAGES} = require('../../utils/constants')

class HaveCourseController {
    async get(req, res) {
        try {
            const haveCourse = await HaveCourse.findAll()
            return res.send(haveCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res) {
        try {
            const {title, description} = req.body
            const haveCourse = await HaveCourse.create({title, description})
            return res.send(haveCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {title, description} = req.body
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let haveCourse = await HaveCourse.findOne({where: {id}})
            if (!haveCourse) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            haveCourse.title = title ?? haveCourse.title
            haveCourse.description = description ?? haveCourse.description
            await haveCourse.save()
            return res.send(haveCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const haveCourse = await HaveCourse.findOne({where: {id}})
            if (!haveCourse) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await haveCourse.destroy({where: {id}})
            return res.send(haveCourse)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new HaveCourseController()
