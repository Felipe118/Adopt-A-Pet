const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//helpers
const getToken = require("../helpers/get-token.js");
const createUserToken = require("../helpers/create-user-token.js");
const getUserByToken = require("../helpers/get-user-by-token.js");
const { findOneAndUpdate } = require("../models/User.js");


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
         const user = await User.findOne({email: email})
         
         if(!user){
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
        const id = req.params.id

        const token = getToken(req)

        const user = await getUserByToken(token)

        if(!user){
            res.status(422).json({
                message: 'Usuário Não encontrado'
            })
            return
        }

        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
         let image = ''

         if(req.file){
             user.image = req.file.filename
         }

         //validations

         if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
       }
       user.name = name

       if(!email){
        res.status(422).json({message: 'O email é obrigatório'})
        return
        }

        const userExists = await User.findOne({email:email})

        if(user.email != email && userExists ){
            res.status(422).json({
                message: 'Por favor utilize outro E-mail'
            })
            return
        }
        user.email = email

        if(!phone){
            res.status(422).json({message: 'O phone é obrigatório'})
            return
       }
       user.phone = phone

      if(password != confirmpassword){
        res.status(422).json({message: 'As senhas não conferem!'})
        return
      }else if(password === confirmpassword && password != null ){
      
         //create password
         const salt = await bcrypt.genSalt(12)
         const passwordHash = await bcrypt.hash(password,salt) 

         user.password = passwordHash
      }

      try {

        const UpdateUser = await User.findByIdAndUpdate(
            {_id:user._id},
            {$set:user},
            {new: true}

        )

        res.status(200).json({message: 'Usuário atualizado com sucesso! '})
          
      } catch (error) {
         res.status(500).json({message:error})
         return
      }
      console.log(user)
    }
}