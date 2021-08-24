const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        methods: ["GET", "POST"],
    }
});



const PORT = process.env.PORT || 5000

const router = require('./router')
const { addUser , removeUser , getUser , getUsersInRoom } = require('./users')

app.use(router)
app.use(cors())



io.on('connection',(socket)=>{
    console.log("NEW CONNECTION!")

    socket.on('join',({ name , room } , callback)=>{

        const { error , user} = addUser({id: socket.id, name , room})
        if(error) return callback(error)

        socket.join(user.room)  ;
        
        socket.emit('message',{user : 'admin' , text : `Hello ${user.name} ,Welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined the chat`});
        
        

        callback();
    })

    socket.on('sendMessage', ( message , callback ) => {
        const user = getUser(socket.id)
        
        io.to(user.room).emit('message', {user: user.name , text : message })
        callback();
    })

    socket.on('disconnect',() => {
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
        
    })
})


server.listen(PORT , ()=>{
    console.log(`SERVER started at ${PORT}`)
})

