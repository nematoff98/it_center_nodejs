const { CostEducation, CostEducationBlocks, CostEducationRoles, CourseProgramModules} = require('../../models/models')
class CostEducationController {
    async get(req, res) {
        try {
            const costEducationList = await CostEducation.findAll()
            const costEducationBlockList = await CostEducationBlocks.findAll({include: [{model: CostEducationRoles, as: 'roles'}]})
            const data = {
                ...costEducationList,
                blocks: [
                    ...costEducationBlockList
                ]
            }
            return res.send(data)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new CostEducationController()
