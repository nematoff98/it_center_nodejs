const { LearnCourse, LearnCourseInfos} = require('../../models/models')
class LearnCourseController {
    async get(req, res) {
        try {
            const learnCourseList = await LearnCourse.findAll({include: [{model: LearnCourseInfos, as: 'info'}]})
            return res.send(learnCourseList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new LearnCourseController()
