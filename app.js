const express = require('express');
const {WebSocketServer} = require('ws');
const app = express();

app.use('/',express.static(__dirname+'/public'));

app.listen(8080,()=>{
    console.log(`server is running on http://localhost:8080`);
})


const wss = new WebSocketServer({port : 8081});

// wss.on('connection', (res,req) => {
//     res.on('message',data=>{
//         console.log(`Received from user : ${data}`);
//         res.send(`Received ${data}`);
//     })

//     res.send(`Hello, ${req.socket.remoteAddress}`);
// })

wss.on('connection', (res,req) => {
    wss.clients.forEach(client => {
        client.send(`새로운 유저가 접속했습니다. 현재 유저 ${wss.clients.size}명`);
    })

    res.on("close", () => {
        wss.clients.forEach((client) => {
          client.send(`유저 한명이 떠났습니다. 현재 유저 ${wss.clients.size} 명`);
        });
    });

    res.on("message", data => {
        wss.clients.forEach(client => {
          client.send(data.toString())
        })
    })

    console.log(`새로운 유저 접속 : ${req.socket}`)
})