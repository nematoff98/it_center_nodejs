const { CostEducationRoles, CostEducationBlocks } = require('../../models/models')
const ApiError = require('../../error/ApiError')
const FormError = require('../../error/FormError')
const { ERROR_MESSAGES} = require('../../utils/constants')

class MainController {
    async get(req, res) {
        try {
            const costEducation = await CostEducationBlocks.findAll({include: [{model: CostEducationRoles, as: 'roles'}]})
            return res.send(costEducation)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body
            const validateBody = FormError(body, ['title', 'description', 'roles', 'price'])
            if(validateBody) return next(ApiError.formError(validateBody))
            const costEducation = await CostEducationBlocks.create({
                title: body.title,
                description: body.description,
                subTitle: body.subTitle,
                price: body.price,
            })
            if(!body.roles.length) next(ApiError.formError({roles: 'Ushbu maydon to\'ldirilishi majburiy'}))
            await body.roles.forEach(async (p) => {
                await CostEducationRoles.create({
                    role: p.role,
                    text: p.text,
                    parent_id: costEducation.dataValues.id
                })
            })
            res.send({message: 'success'})
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
    async update(req, res, next) {
        try {
            const body = req.body
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const costEducation = await CostEducationBlocks.findOne({where: {id}})
            if(!costEducation) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            costEducation.title = body.title ?? costEducation.title
            costEducation.description = body.description ?? costEducation.description
            costEducation.subTitle = body.subTitle ?? costEducation.subTitle
            costEducation.price = body.price ?? costEducation.price
            await costEducation.save()
            if(body.roles && body.roles.length) {
                await CostEducationRoles.destroy({where: {parent_id: costEducation.id}})
                await body.roles.forEach(async (p) => {
                    await CostEducationRoles.create({
                        roles: p.role ?? '',
                        text: body.text ?? '',
                        parent_id: costEducation.dataValues.id
                    })
                })
            }
            return res.send({data: {...costEducation.dataValues}})
        } catch (err) {
            res.status(err.status).json({message: 'success'})
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!id) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            const costEducation = await CostEducationBlocks.findOne({where: {id}})
            if (!costEducation) return next(ApiError.badRequest(ERROR_MESSAGES.notOrWrongId))
            await CostEducationRoles.destroy({where: {parent_id: id}})
            await costEducation.destroy({where: {id}})
            return res.send(costEducation)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MainController()
