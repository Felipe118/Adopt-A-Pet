const getToken = require("../helpers/get-token.js")
const getUserByToken = require("../helpers/get-user-by-token.js")
const Pet = require("../models/Pet.js")

module.exports = class PetController{
    //create a pet

    static async create(req,res){
        const {name,age,weight,color} = req.body
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
}