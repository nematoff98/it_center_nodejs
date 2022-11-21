const { Main } = require('../../models/models')
class mainInfoController {
    async get(req, res) {
        try {
            const mainInfoList = await Main.findAll()
            return res.send(mainInfoList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new mainInfoController()
