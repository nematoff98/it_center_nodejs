const path = require('path')
const mime = require('mime-types')
const uuid = require('uuid')

class HelperFunctions {
    async uploadFiles(file) {
        try {
            const typeImage = `.${mime.extension(file.mimetype) ?? 'jpg'}`
            let fileName = uuid.v4() + typeImage
            await file.mv(path.resolve(__dirname, '../', 'static', fileName))
            return fileName
        } catch (err) {
            return null
        }
    }
}

module.exports = new HelperFunctions()
