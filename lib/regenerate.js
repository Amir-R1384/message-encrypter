require('dotenv').config()

const fs = require('fs')
const crypto = require('crypto')
const seperator = process.env.SEPERATOR

const encrypt_data = {}
const decrypt_data = {}

for (let i = 0; i < 256; i++) {
    const key = String.fromCharCode(i)
    const value = crypto.randomBytes(16).toString('hex') + seperator
    encrypt_data[key] = value
}
fs.writeFileSync('./data/encryptionData.json', JSON.stringify(encrypt_data, null, 2))

Object.values(encrypt_data).forEach((encryptedValue, i) => {
    const key = encryptedValue.slice(0, -1)
    const value = Object.keys(encrypt_data)[i]
    decrypt_data[key] = value
})
fs.writeFileSync('./data/decryptionData.json', JSON.stringify(decrypt_data, null, 2))

console.log('\x1b[32m', 'Data regenerated!')
