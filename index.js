
const express = require('express')
const uuid = require('uuid') 

const port = 3001 
const app = express() 
app.use(express.json()) 




const users = []
         
const checkuserId = (request, response, next) =>{  
    const {id} = request.params          

    const index = users.findIndex (user => user.id === id) 
   
    if (index < 0) { 
      
        return response.status(404).json({error: "user not found"})
}   
    request.userIndex = index
    request.userId = id    
    next() 
}  

const checkMethodUrl = (request, response, next) =>{
    console.log(request.method)
    console.log(request.url)
    next()
}

app.get('/order',checkMethodUrl, (request, response) =>{ 
    return response.json(users)  
})

app.post('/order', checkMethodUrl, (request, response) =>{ 
    const { order, ClientName, price } = request.body     
    
    const user = { id:uuid.v4(), order, ClientName, price, status:"em preparação" }     
     
    users.push(user) 
    return response.status(201).json(user) 
})                                     

app.put('/order/:id',checkuserId, checkMethodUrl, (request, response) =>{ 
                                                         
                                       
    const {order, ClientName, price} = request.body  
    const index = request.userIndex
    const id = request.userId 
    
    const updatedUser = {id, order, ClientName, price, status:"em preparação"} 

       users[index] =  updatedUser 
    return response.json(updatedUser) 
})          

app.get('/order/:id',checkuserId,checkMethodUrl,(request,response) =>{
    const index = request.userIndex

    const indexConsult = users[index]
    return response.json(indexConsult)
})

app.patch('/order/:id',checkuserId,checkMethodUrl,(request, response) =>{
   const index = request.userIndex

   const update = users[index]
   update.status = "pronto"
   return response.json(update)  
})
          
app.delete('/order/:id',checkuserId , (request, response) =>{  
                   
   const index = request.userIndex

   users.splice(index,1) 
   
   return response.status(204).json(users)
})   


app.listen(port, () => {                      
    console.log(`🚀 Esta Rodando. ${port}`)  
})
