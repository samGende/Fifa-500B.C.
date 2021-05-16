const path = require('path');
const http = require('http');
const express=require('express');
const socketio= require('socket.io');

const app= express();
const server =http.createServer(app);
const io = socketio(server);

let gameState={}
let playerList={}
let ball={
  x:350,
  y:200,
}
let playerSpeed={
  x:0,
  y:0
}
let playerA={
  x:1,
  y:1,
}
let ballSpeed={
  x:1,
  y:1
}
function Player(id){
  let self={
    x:200,
    y:200,
    id:id,
    d:false,
    a:false,
    s:false,
    w:false,
  }
  return self
}
//gets distance between two points
function distance(x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))
}
//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when player connects
io.on('connection', function(socket){
     socketid=Math.random()
      gameState[socketid]=socket;
      let player=Player(socketid);
      playerList[socketid]=player;
      //gets key inputs
      socket.on('right',()=>{
        player.d=true;
      })
      socket.on('rightKeyUp',()=>{
        player.d=false;
      })
      socket.on('left',()=>{
        player.a=true;
      })
      socket.on('leftKeyUp',()=>{
        player.a=false;
      })
      socket.on('up',()=>{
        player.w=true;
      })
      socket.on('upKeyUp',()=>{
        player.w=false;
      })
      socket.on('down',()=>{
        player.s=true;
      })
      socket.on('downKeyUp',()=>{
        player.s=false;
      })
socket.on('disconnect',function(){
  delete gameState[socketid];
  delete playerList[socketid];
})
    })



  console.log('new socket bois');

setInterval (function(){

   let pack=[];
     for (let i in playerList){
   let player=playerList[i];
   function playerMovement(){

     if(player.a===true){
       playerSpeed.x=playerSpeed.x-playerA.x
     }else if(player.d===true){
       playerSpeed.x=playerSpeed.x+playerA.x
     }else if(player.a===false&&player.d===false){

       playerSpeed.x===playerSpeed.x/4
     }if(player.w===true){
      playerSpeed.y=playerSpeed.y-playerA.y
     }else if (player.s===true){
      playerSpeed.y=playerSpeed.y+playerA.y
     }else if (player.w===false&&player.s===false){
       playerSpeed.y=playerSpeed.y/4
     }
     player.x=player.x+playerSpeed.x
     player.y=player.y+playerSpeed.y
   }
   function ballMovement(){
     ball.x=ball.x+ballSpeed.x
     ball.y=ball.y+ballSpeed.y
     if(ball.x>695||ball.x<5){
       ballSpeed.x=-ballSpeed.x
     }if (ball.y>395||ball.y<5){
       ballSpeed.y=-ballSpeed.y
     } if(distance(ball.x,ball.y,player.x,player.y)<15){
       ballSpeed.x=playerSpeed
     }
   }

  playerMovement()
   pack.push({
     x:player.x,
     y:player.y

   });
 }
 pack.push({
   ballx:ball.x,
   bally:ball.y
 })
    for (let i in gameState){
       let socket=gameState[i];
   socket.emit('newPosistion',pack)
}
},1000 / 60);





server.listen(process.env.PORT||3000);
