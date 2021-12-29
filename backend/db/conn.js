const mongoose = require("mongoose")

async function main(){
    await mongoose.connect("mongodb://localhost:27017/getapet")
    console.log("Conectou ao Mongoose")
}

main().catch((erro) => console.log(erro))

module.exports = mongoose