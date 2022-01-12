const express = require("express")
const cors = require("cors")

const app = express()

//config JSON response

app.use(express.json())

//Salve Cors
app.use(cors({credentials:true,origin:'http://localhost:3000' }))

//Public folder dor images
app.use(express.static('assets'))

//Routers
const UserRoutes = require('./routes/UserRoutes.js')
const PetRoutes = require('./routes/PetRoutes.js')
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.listen(5000)
