const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json({
    limit: '10mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})