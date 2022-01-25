const getToken = require("../helpers/get-token.js")
const getUserByToken = require("../helpers/get-user-by-token.js")
const Pet = require("../models/Pet.js")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = class PetController{
    //create a pet

    static async create(req,res){
        const {name,age,weight,color} = req.body
        const images = req.files

        const available = true


        //validation
        if(!name){
            res.status(422).json({message: "O nome  é obrigatório"})
            return
        }
        if(!age){
            res.status(422).json({message: "A idade  é obrigatório"})
            return
        }
        if(!weight){
            res.status(422).json({message: "O peso  é obrigatório"})
            return
        }
        if(!color){
            res.status(422).json({message: "A cor  é obrigatório"})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem  é obrigatório"})
            return
        }
        //dono do pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            image:[],
            user: {
             _id: user._id,
             name:user.name,
             image: user.image,
             phone: user.phone,
            },
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })
     

        try {
            const newPet = await pet.save()
       

           
            res.status(201).json({
                message: "Pet cadastrado com sucesso",
                newPet,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
        

       
    }

    static async getAll(req,res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req,res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id':user._id}).sort('-createdAt')
        res.status(200).json({
            pets,
        })
    }

    static async getAllUserAdoprions(req,res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id':user._id}).sort('-createdAt')
        res.status(200).json({
            pets,
        })
    }

    static async getPetById(req,res){
           const id = req.params.id 
        //check if id is valid
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "ID inválido"})
            return
        }
     //check pet is exists
        const pet = await Pet.findOne({_id:id })

        if(!pet){
            res.status(404).json({message: "Pet não encontrado"})
            return
        }
        res.status(200).json({
            pet: pet,
        })

          
    }

    static async removePetById(req,res){
        const id = req.params.id
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "ID inválido"})
            return
        }

        const pet = await Pet.findOne({_id:id })

        if(!pet){
            res.status(404).json({message: "Pet não encontrado"})
            return
        }

        //check if logged is users register the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: "Houve um problema em processar sua solicitação"})
            return
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({
            message: 'Pet removido com sucesso'
        })
    }

    static async updatePet(req,res){
        const id = req.params.id

        const {name,age,weight,color,available} = req.body


        const images = req.files

        const updateData = {}

        //chech if pet exists
        const pet = await Pet.findOne({_id:id })

        if(!pet){
            res.status(404).json({message: "Pet não encontrado"})
            return
        }

        //check if logged is users register the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: "Houve um problema em processar sua solicitação"})
            return
        }

         //validation
         if(!name){
            res.status(422).json({message: "O nome  é obrigatório"})
            return
        }else{
            updateData.name = name
        }
        if(!age){
            res.status(422).json({message: "A idade  é obrigatório"})
            return
        }else{
            updateData.age = age
        }
        if(!weight){
            res.status(422).json({message: "O peso  é obrigatório"})
            return
        }else{
            updateData.weight = weight
        }
        if(!color){
            res.status(422).json({message: "A cor  é obrigatório"})
            return
        }else{
            updateData.color = color
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem  é obrigatório"})
            return
        }else{
            updateData.images= []
            images.map((image) => {
                updateData.images.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id,updateData)

        res.status(200).json({
            message: 'Pet atualizado com sucesso'
        })

      
    }
    static async schedule(req,res){
        const id = req.params.id

        //chech if pet exists
        const pet = await Pet.findOne({_id:id })

        if(!pet){
            res.status(404).json({message: "Pet não encontrado"})
        return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: "Você não pode agendar uma visita para seu próprio Pet"})
            return
        }

        //check if user hasw already shcheduled a visit
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: "Você já agendou uma visita para este Pet"})
                return
            }

            }
            // add user to pet
            pet.adopter = {
                _id: user._id,
                name: user.name,
                image: user.image,
            }

            await Pet.findByIdAndUpdate(id,pet)

            res.status(200).json({
                message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name}  pelo telefone ${pet.user.phone}`
            })
        }

        static async concludeAdoption(req,res){
            const id = req.params.id

            const pet = await Pet.findOne({_id:id })

            if(!pet){
                res.status(404).json({message: "Pet não encontrado"})
            return
            }
            
        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: "Houve um problema em processar sua solicitação"})
            return
        }

            pet.available = false



        }
}