define([
  'view',
  'text!templates/talk_form.html',
], function( Vm, talkformTemplate){
  
  var TalkFormView = Backbone.View.extend({
    el: '.submit_area',

    render: function () {

        $(this.el).html(_.template(talkformTemplate));
    },
    events:{
      'submit #chating' : 'talk',
    },
    talk:function(e){
      e.preventDefault();
     
     
        var msg = $('#chat').val();
         $('#chat').val('');
         
       Socket.emit('sendchat', msg);
      }
  });
  return TalkFormView;
});
