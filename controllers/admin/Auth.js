const jwt = require('jsonwebtoken')
const FormError = require("../../error/FormError");
const {Users} = require("../../models/models");

class Auth {
    async registration(req, res) {
        console.log(12)
        try {
            const error = FormError(req.body, ['login', 'password', 'full_name'])
            if(error) {
                return res.status(422).send({errors: error})
            }
            const {login, password, full_name} = req.body
            const user = await Users.findOne({where: {login}})
            if (user) {
                return res.status(422).json({message: 'Bu username bilan user mavjud'})
            }
            await Users.create({
                login, password, full_name
            })
            res.status(200).json({message: 'Successful completed'})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
    async login(req, res) {
        try {
            const error = FormError(req.body, ['login', 'password'])
            if(error) {
                return res.status(422).send({errors: error})
            }
            const {login, password} = req.body
            const user = await Users.findOne({where: {login, password}})
            if (!user) {
                return res.status(422).json({errors: {password: 'Parol yoki login noto\'g\'ri kiritilgan'}})
            }
            const token = await jwt.sign({
                full_name: user.dataValues.full_name,
                id: user.dataValues.id
            }, process.env.SECRET_KEY)
            res.cookie('Authorization', token, {httpOnly:true})
            res.status(200).send({full_name: user.dataValues.full_name, expire_in: 3600000, token: token})
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }

    async refreshToken(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                    if (err) {
                        return res.status(401)
                    } else {
                        const user = await Users.findOne({where: {id: decoded.id}})
                        if (!user) {
                            return res.status(401)
                        }
                        const token = await jwt.sign({
                            full_name: user.dataValues.full_name,
                            id: user.dataValues.id
                        }, process.env.SECRET_KEY, {expiresIn: '1h'})
                        res.status(200).send({full_name: user.dataValues.full_name, expire_in: 3600000, token: token})
                    }
                }
            )
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}


module.exports = new Auth()
