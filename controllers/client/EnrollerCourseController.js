const { EnrolledCourse} = require('../../models/models')
const FormError = require('../../error/FormError')
class EnrolledCourseController {
    async create(req, res) {
        try {
            const body = req.body
            const formError = FormError(body, ['email', 'phone', 'name'])
            if(formError) return res.status(422).json(formError)
            const user = await EnrolledCourse.findOne({where: {email: body.email, phone: body.phone}})
            if(user) return res.status(422).json(`Ushbu email va telefon nomer egasi kursga yozilgan`)
            const createdUser = await EnrolledCourse.create({...body})
            return res.send(createdUser)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new EnrolledCourseController()
