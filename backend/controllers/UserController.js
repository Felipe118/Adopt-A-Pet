const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//helpers
const getToken = require("../helpers/get-token.js");
const createUserToken = require("../helpers/create-user-token.js");
const { findById } = require("../models/User.js");

module.exports = class UserController{
    static async register(req,res){

       const {name,email,phone,password,confirmpassword} = req.body

       //validations

       if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
       }
       if(!email){
        res.status(422).json({message: 'O email é obrigatório'})
        return
        }
        if(!phone){
            res.status(422).json({message: 'O phone é obrigatório'})
            return
       }
       if(!password){
        res.status(422).json({message: 'A senha é obrigatório'})
        return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatório'})
            return
         }

         if(password !== confirmpassword){
            res.status(422).json({message: 'A  senha e a confirmação de senha precisam ser iguais'})
            return
        }

        //check if user exists
        const UserExists = await User.findOne({email: email})
        if(UserExists){
            res.status(422).json({
                message: "E-mail já cadastrado no sistem"
            })
            return
        }

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt) 

        //create user
        const user = new User({
            name:name,
            email: email,
            phone: phone,
            password:passwordHash
        })

        try{
            const newUser = await user.save()
           await createUserToken(newUser, req,res)

        }catch(error){
            res.status(500).json({message: error})
        }

    }

    static async login(req,res){
        const {email,password} = req.body

        if(!email || !password){
            res.status(422).json({message: 'O email e senha são obrigatórios'})
            return
        }

         //check if user exists
         const userExists = await User.findOne({email: email})
         if(!userExists){
             res.status(422).json({
                 message: "Usuário não cadastrado"
             })
             return
         }

         //che if match with db password
         const checkPassword = await bcrypt.compare(password, user.password)

         if(!checkPassword){
            res.status(422).json({
                message: "Senha Inválida!"
            })
            return
         }
         await createUserToken(user, req,res)
    }
    static async checkUser(req,res){
        let currentUser
        console.log(req.headers.authorization)
        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            
            currentUser.password = undefined
        }else{
            correntUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req,res)
    {
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.status(422).json({
                message: 'Usuário Não encontrado'
            })
            return
        }
        res.status(200).json({user})
    }
    static async editUser(req,res)
    {
        res.status(200).json({
            message: 'Update feito com sucesso'
        })
        return
    }
}