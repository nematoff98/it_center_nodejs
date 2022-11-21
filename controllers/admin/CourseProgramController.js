const { CourseProgram, CourseProgramModules } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const FormError = require('../../error/FormError')
const { ERROR_MESSAGES } = require('../../utils/constants')
class MainController {
    async get(req, res) {
        try {
            const mainList = await CourseProgram.findAll({include: [{model: CourseProgramModules, as: 'modules'}]})
            return res.send(mainList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body
            const validateBody = FormError(body, ['title', 'description', 'modules'])
            if(validateBody) return next(ApiError.formError(validateBody))
            const mainList = await CourseProgram.create({
                title: body.title,
                description: body.description,
            })
            if(!body.modules?.length) ApiError.formError({errors: {modules: 'modules maydoni to`ldirilishi majburiy'}})
            await body.modules.forEach(async (p) => {
                CourseProgramModules.create({
                    module_number: p.module_number,
                    module_text: p.module_text,
                    parent_id: mainList.dataValues.id
                })
            })
            return res.send(mainList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const {title, description, modules} = req.body
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            let programList = await CourseProgram.findOne({where: {id}})
            if (!programList) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            programList.title = title ?? programList.title
            programList.description = description ?? programList.description
            await programList.save()
            if(modules.length) {
                await CourseProgramModules.destroy({where: {parent_id: programList.dataValues.id}})
                await modules.forEach(async (p, i) => {
                    CourseProgramModules.create({
                        module_number: p.module_number ?? i + 1,
                        module_text: p.module_text ?? '',
                        parent_id: programList.dataValues.id
                    })
                })
            }
            return res.send(programList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const courseProgram = await CourseProgram.findOne({where: {id}})
            if (!courseProgram) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await CourseProgramModules.destroy({where: {parent_id: id}})
            await courseProgram.destroy({where: {id}})
            return res.send(courseProgram)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
