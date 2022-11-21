const { CourseInstructor } = require('../../models/models')
class CourseInstructorController {
    async get(req, res) {
        try {
            const courseInstructor = await CourseInstructor.findAll()
            return res.send(courseInstructor)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new CourseInstructorController()
