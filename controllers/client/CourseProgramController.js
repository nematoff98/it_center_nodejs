const { CourseProgram, CourseProgramModules} = require('../../models/models')
class CourseProgramController {
    async get(req, res) {
        try {
            const courseProgramList = await CourseProgram.findAll({include: [{model: CourseProgramModules, as: 'modules'}]})
            return res.send(courseProgramList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new CourseProgramController()
