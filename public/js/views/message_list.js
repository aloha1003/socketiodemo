define([
  'view',
  'text!templates/message_list.html',
], function( Vm, messageListTemplate){
  
  var TalkFormView = Backbone.View.extend({
    el: '.message_area',

    render: function () {
      window.Socket = io.connect('http://localhost:3000');
        $(this.el).html(_.template(messageListTemplate));
        Socket.on('connect', function(){ 
        
          Socket.emit('adduser', prompt("請輸入你的名字"));
        });
      Socket.on('updatechat', function (username, data) {
         $('.message_list').append('<b>'+username + ':</b> ' + data + '<br>');
      });
    }
  });
  return TalkFormView;
});
