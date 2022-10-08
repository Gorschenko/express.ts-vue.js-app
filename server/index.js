const express = require('express')
const path = require('path')

const PORT = 8000

const app = express()

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())


app.post('/login', async (req, res) => {
    try {
      console.log(req.body)
      res.json(req.body)
    } catch (e) {
      console.log(e)
    }
})

app.use((req, res, next) => {
    res.sendFile('index.html')
})



app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})