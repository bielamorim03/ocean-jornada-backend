const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!')
})


app.get('/oi', function (req, res) {
    res.send('Olá Mundo!')
  })


// Lista de Personagens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']


// Read all -> [GET] /item
app.get('/item', function(req, res) {
  // Envio da lista inteira como resposta
  res.send(lista)
})


// Read By ID -> [GET] /item/:id
app.get('/item/:id', function(req, res) {
  // Acesso o ID no parâmetro de rotas
  const id = req.params.id

  //Acesso item na Lista baseado no ID recebido
  const item = lista[id]

  //Envio do item obtido como resposta HTTP
  res.send(item)
})



app.listen(3000)
