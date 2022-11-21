const { Contact } = require('../../models/models')
class ContactController {
    async get(req, res) {
        try {
            const contactList = await Contact.findAll()
            if(contactList.length) return res.send(contactList[0])
            else return res.send({})
        } catch (err) {
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = new ContactController()
