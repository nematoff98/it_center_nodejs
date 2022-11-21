const { ForCourse } = require('../../models/models')
class ForCourseController {
    async get(req, res) {
        try {
            const forCourseList = await ForCourse.findAll()
            return res.send(forCourseList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new ForCourseController()
