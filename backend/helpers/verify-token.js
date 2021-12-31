const jwt = require("jsonwebtoken")
const getToken = require("../helpers/get-token.js");

const checkToken = (req,res,next) => {
    console.log(req.headers)
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'Acesso Negaddsdo!'
        })
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }

    try{
        const verified = jwt.verify(token,'nossosecret')
        req.user = verified
        next()

    }catch(err){
        return res.status(400).json({
            message: 'Token Inválido'
        })
    }
}

module.exports = checkToken