if (process.env.NODE_ENV === 'development') require('dotenv').config()

const { encrypt, decrypt } = require('./lib/encryption')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json({ limit: '10mb' }))
app.use(express.static('./public'))

app.get('/', (req, res) => res.render('index'))

app.post('/encrypt', (req, res) => {
    try {
        const { message } = req.body
        const encrypted = encrypt(message)
        res.status(200).json({ encrypted })
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
})

app.post('/decrypt', (req, res) => {
    try {
        const { encrypted } = req.body
        const decrypted = decrypt(encrypted)
        res.status(200).json({ decrypted })
    } catch (error) {
        console.error(error)
        res.status(500).end()
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('\x1b[32m', 'Listening for requests...')
})
