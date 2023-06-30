const express = require("express") // inicialização express
const router = express.Router()    // configuração da rota
const cors = require('cors') // pacote cors que permite instalar e conectar a API no frontend


const conectaBandoDeDados = require("./database")    // ligando ao arquivo database
conectaBandoDeDados()                               // chamando a função que conecta o banco de dados 

const Mulher = require('./model').default
const app = express()              // inicialização do app
app.use(express.json())
app.use(cors())

const porta = 3333                  // criação da porta



//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresBD = await Mulher.find()

        response.json(mulheresBD)
    } catch (erro) {
        console.log(erro)
    }
    
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({

        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }

   
}

//DELETE
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "mulher deletada com sucesso"})

    } catch (erro) {
        console.log(erro)
    }
}


app.use(router.get('/mulheres', mostraMulheres))                // configuração rota GET / mulheres
app.use(router.post('/mulheres', criaMulher))                   // configuração rota POST / mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))          // configuração rota PATCH / mulher /: id
app.use(router.delete('/mulheres/:id', deletaMulher))           // configuração rota Delete / mulher /:id

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}
app.listen(porta, mostraPorta)                   // servidor ouvindo a porta