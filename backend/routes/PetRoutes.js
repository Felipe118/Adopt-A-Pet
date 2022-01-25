const router = require("express").Router()

const PetController = require("../controllers/PetController.js")

//middleware
const verifyToken = require("../helpers/verify-token.js")
const {imageUpload} = require("../helpers/image-upload.js")

router.post('/create', verifyToken,imageUpload.array('images'),PetController.create)
router.get('/',PetController.getAll)
router.get('/mypets', verifyToken,PetController.getAllUserPets )
router.get('/myadoptions',verifyToken,PetController.getAllUserAdoprions)
router.get('/:id',PetController.getPetById)
router.delete('/:id',verifyToken,PetController.removePetById)
router.patch('/:id', verifyToken,imageUpload.array('images'),PetController.updatePet)
router.patch('/schedule/:id',verifyToken,PetController.schedule)
router.patch('/conclude/:id',verifyToken,PetController.concludeAdoption)

module.exports = router

