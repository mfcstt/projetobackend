const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBandoDeDados() {
  try {
    console.log("Conexão com o Banco de Dados iniciou.")

    await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexaão com o Banco de Dados estabelecida.')
  } catch(erro) {
    console.log(erro)
  }
}

module.exports = conectaBandoDeDados