const encrypt_data = require('../data/encryptionData.json')
const decrypt_data = require('../data/decryptionData.json')
const seperator = process.env.SEPERATOR

module.exports.encrypt = (message) => {
    let encrypted = ''

    for (let i = 0; i < message.length; i++) {
        const value = encrypt_data[message[i]]
        encrypted += value
    }

    return encrypted
}

module.exports.decrypt = (encrypted) => {
    encrypted = encrypted.slice(0, -1) // Removing the seperator at the end

    let message = ''

    encrypted.split(seperator).forEach((code) => {
        const meaning = decrypt_data[code]
        message += meaning
    })

    return message
}
