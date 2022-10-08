const express = require('express')
const path = require('path')

const PORT = 8000

const app = express()

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())


app.get('/todo/hello', (req, res) => {
    res.json({ a: 1 })
})

app.use((req, res, next) => {
    res.sendFile('index.html')
})



app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})