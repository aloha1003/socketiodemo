var express = require('express');
var app = express.createServer()
 , path = require('path')
  , io = require('socket.io').listen(app);
app.configure(function(){
	 app.use(express.static(path.join(__dirname, 'public')));
});
app.listen(3000);
var usernames = {};
var rooms = ['聊天室1','聊天室2','聊天室3'];

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('sendchat', function(data){
  
  	//io.sockets.emit('updatechat',socket.username,data);
  	io.sockets.in(socket.room).emit('updatechat',socket.username,data);
  });
  
  socket.on('adduser',function(username){
  	socket.username = username;
  	usernames[username] = username;
  	socket.room = rooms[0];
  	socket.join(rooms[0]);
  	socket.emit('updatechat','Server','你已加入聊天室:'+rooms[0]);
  	//socket.broadcast.emit('updatechat','Server',username+'已加入聊天室');
  	socket.broadcast.to(rooms[0]).emit('updatechat','Server',username+'已加入聊天室'+rooms[0]);
  	io.sockets.emit('updateusers',usernames);
    socket.emit('updaterooms', rooms,rooms[0]);
  });
  socket.on('switchroom',function(newroom){
  	socket.leave(socket.room);
  	socket.join(newroom);
  	socket.emit('updatechat', 'SERVER', '你已進入 '+ newroom);
  	socket.broadcast.to(socket.room).emit('updatechat','Server',socket.username+'已退出'+socket.room);
  	socket.room = newroom;
  	socket.broadcast.to(newroom).emit('updatechat','Server',socket.username+'已進入聊天室'+newroom);
  	socket.emit('updaterooms', rooms, newroom);
  });
  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' 已斷線');
  });
});