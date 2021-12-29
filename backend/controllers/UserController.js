const User = require("../models/User.js")

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
    }
}