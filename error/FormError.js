module.exports = (body = {}, form = []) => {
    const bodyLength = Object.keys(body).length
    const result = {}
    if(bodyLength && form.length) {
        form.forEach((p, i) => {
            if(!body[p] || !(p in body)) {
                result[p] = `${p} maydoni to'ldirilishi majburiy`
            }
            if(Array.isArray(body[p]) && !body[p].length) {
                result[p] = `${p} maydoni to'ldirilishi majburiy`
            }
        })
    }

    if(!Object.keys(result).length) return null

    return result
}
