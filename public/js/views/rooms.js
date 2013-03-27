define([
  'view',
  'text!templates/rooms.html',
], function( Vm, roomTemplate){
  
  var RoomsView = Backbone.View.extend({
    el: '.rooms_container',

    render: function () {

        $(this.el).html(_.template(roomTemplate));
        $('.room').on('click',function(){

        });
        Socket.on('updaterooms', function(rooms, current_room) {
          console.log('updaterooms');
    $('#rooms').empty();
    $.each(rooms, function(key, value) {
      if(value == current_room){
        $('#rooms').append('<div>' + value + '</div>');
      }
      else {
        $('#rooms').append('<div><a href="#" class="room" rel="'+value+'">' + value + '</a></div>');
      }
    });
  });
    },
    events:{
      'click .room' : 'switchroom',

    },
    switchroom:function(e){

      var room = $(e.currentTarget).attr('rel');
    
        Socket.emit('switchroom', room);
      }
  });
  return RoomsView;
});
