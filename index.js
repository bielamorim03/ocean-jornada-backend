const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:JG4RqcPPtxXtDIgy@cluster0.1imo7ys.mongodb.net'
const dbName = 'OceanJornadaBackend'

async function main() {
  const client = new MongoClient(dbUrl)

  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello, World!')
  })


  app.get('/oi', function (req, res) {
    res.send('Olá Mundo!')
  })


  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db = client.db(dbName)
  const collection = db.collection('personagens')


  // Read all -> [GET] /item
  app.get('/item', async function (req, res) {
    // Realizamos a operação de find na collection do mongodb
    const personagens = await collection.find().toArray()
    // Envio da lista inteira como resposta HTTP
    res.send(personagens)
  })


  // Read By ID -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acesso o ID no parâmetro de rotas
    const id = req.params.id

    // Acesso item na Lista baseado no ID recebido
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Envio do item obtido como resposta HTTP
    res.send(item)
  })

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json())

  // Create -> [POST] /item
  app.post('/item', async function (req, res) {
    // Extraimos o corpo da requisição
    const item = req.body

    // Colocamos o item dentro da collection de itens
    await collection.insertOne(item)

    // Enviamos uma resposta de sucesso
    res.send(item)
  })

  // Update -> [PUT] /item/:id
  app.put('/item/:id', async function (req, res) {
    // Pegamos o ID recebido pela rota
    const id = req.params.id

    // Pegamos o novo item do corpo da requisição
    const novoItem = req.body

    // Atualizamos o documento na collection
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: novoItem }
    )


    res.send('Item atualizado com sucesso!')
  })


    // Delete -> [DELETE] /item/:id
    app.delete('/item:id', async function (req, res) {
      // Pegamos o ID da rota
      const id = req.params.id

      // Realizamos a operação de deleteOne
      await collection.deleteOne( { _id: new Object(id) })

      // Enviamos uma mensagem de sucesso
      res.send('Item removido com sucesso! ')
    })
  app.listen(3000)
}

main()
