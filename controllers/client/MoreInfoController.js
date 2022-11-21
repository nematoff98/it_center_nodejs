const { MoreInfo } = require('../../models/models')
class MoreInfoController {
    async get(req, res) {
        try {
            const moreInfoList = await MoreInfo.findAll()
            return res.send(moreInfoList)
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new MoreInfoController()
