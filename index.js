
const express = require('express') // 1- para ter acesso as extenções do node e o express
const uuid = require('uuid')  // 11- criando o ID 

const port = 3001 // 2- todo local, arquivo tem uma porta de acesso, este é meu acesso ao node. (de 3k pra cima)
const app = express() // 3- criei uma variavel para ter acesso ao express, que agora é só usar APP. que vai se referir ao express
app.use(express.json()) // 4- os APP são rotas, e é preciso usar isto para ter acesso ao JSON




const users = [] // 7- o que guardarei aqui, sempre guardar no banco de dados, isto aqui é para fins didaticos
          //- (quando tem 3 parametros é um middleware)
const checkuserId = (request, response, next) =>{  // 31- eu vou checar todos usuarios se são validos de uma só vez asim o ex:18 não precisaria estar em todas APPS 
    const {id} = request.params          // 14- com o {id} eu acesso o cliente. .PARAMS é forma que eu acesso o cliente

    const index = users.findIndex (user => user.id === id) // 18- o INDEX é a posição de aonde esta meu usuario"cliente", o USERS eu uso o local aonde vai ser feita a busca, o .FINDINDEX vai me trazer a posição q esta o usuario
    // 18.5 o (USER => USER) é pra percorer usuario por usuario e o .ID === ID ele vai ver se é igual ao que esta no insomnia, quando ele achar ele vai virar o meu INDEX
    if (index < 0) { // 20- IF "se" o index "cliente" for menor < que 0, pq se na busca não achar nada ele responde -1, ou seja se não achar nada responde com o RETURN
      
        return response.status(404).json({error: "user not found"}) // 21 - retorna o rersponse que é a busca eo .STATUS(404) que é a resposta de não encontrado. o .JSON é para retornar uma mensagem ({})
}   
    request.userIndex = index // 32 - o request vai transformar o .userIndex no resultado do index ai de cima, e assim ele vai valer para todos request
    request.userId = id      // 36- agora meu USERID virou meu ID
    next()  // 35-  o NEXT é para que  fluxo continue, como o midd.. ta por primeiro se der algo errado o NEXT continua a aplicação
}  

const checkMethodUrl = (request, response, next) =>{
    console.log(request.method)
    console.log(request.url)
    next()
}

app.get('/order',checkMethodUrl, (request, response) =>{  // 5- os APP são rotas o .GET vai mostrar o que tem na porta que acessei e é usado 2 parametros 1 é a rota que usei o USERS e o outro é uma função, na qual usei o REQUEST eo RESPONSE que é o que o express pede

    return response.json(users)  // 13.5- o .JSON é pra me retornar no meu front end o que tem no meu "Users" "rota que lista todos pedidos ja feitos"
})

app.post('/order', checkMethodUrl, (request, response) =>{  // 8- os APP são rotas o .POST vai criar informações no back-end é usado 2 parametros 1 é a rota que usei o USERS e o outro é uma função, na qual usei o REQUEST eo RESPONSE que é o que o express pede
    const { order, ClientName, price } = request.body      // 10- vou usar o request.BODY para criar meus dados
    
    const user = { id:uuid.v4(), order, ClientName, price, status:"em preparação" }        // 12- criando o ID:UUID.V4() ele cria um id unico P/ cada cliente ex: um cpf
     
    users.push(user)  // 13- 
    return response.status(201).json(user)  // 9- o .JSON é pra me retornar no meu front end o que tem no meu USERS
})                                      // 9-1 o .STATUS(201) tbm é para usar

app.put('/order/:id',checkuserId, checkMethodUrl, (request, response) =>{  // 13- os APP são rotas o .PUT vai acessar os dados do cliente e é usado 2 parametros 1 é a rota que usei o USERS e o outro é uma função, na qual usei o REQUEST eo RESPONSE que é o que o express pede
                                                           // 13- 0 'checkuserId' é um middleware que ja é um resumo de alguns codigos
                                         // 15- no INSOMNIA criar um ID "cliente", criando um PUT, e la ter os dados do cliente
    const {order, ClientName, price} = request.body   // 16- aqui eu vo busca o nome e idade do cliente pelo .BODY
    const index = request.userIndex // 33- aqui meu index"cliente" é o resultado do .userIndex que é a verificação de cada cliente
    const id = request.userId // 37- aqui meu ID vira o resultado do .userId que ja é o caminho do ID criado pelo middleware que vale para todos
    
    const updatedUser = {id, order, ClientName, price, status:"em preparação"}  // 17- vou montar meu usuario criando updat.., usando o id dele com nome e idade

       users[index] =  updatedUser  // 22- isto é para atualizar, o USERS vai trazer [index] "vai vir um numero, posição", e esta posição vai virar o UPDATEDUSER
   // console.log(index) // 19 - isto aqui é só pra ver se esta rodando certinho
    return response.json(updatedUser)  // 13.5- o .JSON é pra me retornar no meu front end o que tem no meu "updatedUser" "qual cliente"
})

app.get('/order/:id',checkuserId,checkMethodUrl,(request,response) =>{
    const index = request.userIndex

    const indexConsult = users[index]
    return response.json(indexConsult)
})

app.patch('/order/:id',checkuserId,checkMethodUrl,(request, response) =>{  // 13- os APP são rotas o .PUT vai acessar os dados do cliente e é usado 2 parametros 1 é a rota que usei o USERS e o outro é uma função, na qual usei o REQUEST eo RESPONSE que é o que o express pede
    // o 'checkuserId' e o 'checkmethodurl' é um middleware que ja é um resumo de alguns codigos
   const index = request.userIndex

   const update = update[index]
   update.status = "pronto"
    
return response.json(update)  // 13.5- o .JSON é pra me retornar no meu front end o que tem no meu "updatedUser" "qual cliente"
})

app.delete('/order/:id',checkuserId , (request, response) =>{  // 23- o .DELETE vai deletar o "ID" e é usado 2 parametros 1 é a rota que usei o USERS e o outro é uma função, na qual usei o REQUEST eo RESPONSE que é o que o express pede
                                                              // 23- // 13- 0 'checkuserId' é um middleware que ja é um resumo de alguns codigos
    // 25- não preciso mais disto -  const {id} = request.params  // 25 - o ID é para ter acesso aos usuarios, .PARAMS é para poder selecionar qual ID
   
   const index = request.userIndex // 34- aqui meu index"clliente" é o resultado do .userIndex que é a verificação de cada cliente
   
   // 26- const index = users.findIndex (user => user.id === id) // 26 - o INDEX é a posição de aonde esta meu usuario"cliente", o USERS eu uso o local aonde vai ser feita a busca, o .FINDINDEX vai me trazer a posição q esta o usuario
   
   // 27- if (index < 0) { // 27- IF "se" o index "cliente" for menor < que 0, pq se na busca não achar nada ele responde -1, ou seja se não achar nada responde com o RETURN
   // 28-  return response.status(404).json({message: "user not found"}) // 28 - retorna o rersponse que é a busca eo .STATUS(404) que é a resposta de não encontrado. o .JSON é para retornar uma mensagem ({})

   users.splice(index,1)  // 29 - o USERS é para ter acesso aos usuarios, .SPLICE() vai selecionar a posição do usuario que vou deletar, o INDEX é o cliente q vai ser selecionado, (INDEX,1) o 1 é a quantidade que vou deletar
   
   return response.status(204).json(users)  // 24- o .STATUS(204) é para trazer o status se deu certo ou não o DELETE o .JSON é pra me retornar no meu front end o que tem no meu USERS
})    // 30 - para deletar agora va ao INSOMNIA, va até aos usuarios copie o ID dele, vá até o DELETE e cole o ID  dele na frente do link, ai é so dar um SEND


app.listen(port, () => {                       // 14 - isto é para rodar no console.log
    console.log(`🚀 Esta Rodando. ${port}`)  
})