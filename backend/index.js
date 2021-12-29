const express = require("express")
const cors = require("cors")

const app = express()

//config JSON response

app.use(express.json())

//Salve Corsa
app.use(cors({credentials:true,origin:'http://localhost:3000' }))

//Public folder dor images
app.use(express.static('assets'))

//Routers
const UserRoutes = require('./routes/UserRoutes.js')
app.use('/users', UserRoutes)
app.listen(5000)
