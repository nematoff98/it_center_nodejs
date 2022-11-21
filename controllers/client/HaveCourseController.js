const { HaveCourse } = require('../../models/models')
class HaveCourseController {
    async get(req, res) {
        try {
            const haveCourseList = await HaveCourse.findAll()
            return res.send(haveCourseList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new HaveCourseController()
