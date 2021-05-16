
const socket=io()
canvas=document.getElementById('canvas');
c=canvas.getContext('2d')


socket.on('newPosistion', function(data){
  c.clearRect(0,0,canvas.width, canvas.height)
  field.centerLine()
  field.centerCircle()
  field.boxs()
  field.goals()
  for(let i=0;i<data.length;i++){
  c.beginPath()
  c.arc(data[i].x,data[i].y,10,0,180)
  c.stroke()}
  c.beginPath()
  c.arc(data[data.length-1].ballx,data[data.length-1].bally,5,0,180)
  c.stroke()
})




let field ={
 centerLine:function(){c.moveTo(350,0)
 c.lineTo(350,400)
 c.stroke()
}, centerCircle:function(){
	c.beginPath()
	c.arc(350,200,50,0,180)
	c.stroke()
},
boxs:function(){
	c.strokeRect(630,100,70,200)
	c.strokeRect(0,100,70,200)
},
goals:function(){
 c.fillRect(0,180,3,40)
 c.fillRect(697,180,3,40)
}
}
let keypess={
  d:false,
  a:false,
  s:false,
  w:false,}
document.addEventListener('keyup', (e) =>{
  if(e.key==="d"){
socket.emit('rightKeyUp')
    keypess.d=false
  }
  if(e.key==="a"){
    socket.emit('leftKeyUp')
    keypess.a=false
  }
  if(e.key==="w"){
    socket.emit('upKeyUp')
    keypess.w=false
  }
  if(e.key==="s"){
    socket.emit('downKeyUp')
    keypess.s=false
  }
});
//on key down keypess changes to true
document.addEventListener('keydown', (e) =>{
 if(e.key==="d"){
socket.emit('right')
   keypess.d=true
  }
  if(e.key==="a"){
    socket.emit('left')
    keypess.a=true
  }
  if(e.key==="w"){
    socket.emit('up')
    keypess.w=true
  }
  if(e.key==="s"){
    socket.emit('down')
    keypess.s=true
  }
});
//checks if keys pressed true=pressed
