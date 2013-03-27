define([
  'view',
  'text!templates/template.html',
  'views/talk_form',
  'views/message_list',
  'views/rooms'
  
], function( Vm, indexTemplate,talkformView,messageListView,roomView){
 
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    render: function () {


      $(this.el).html(indexTemplate);
       
        var messagelistview =  Vm.create(this,'messageListView', messageListView);
                messagelistview.render(); 
        var talkformview =  Vm.create(this,'talkformView', talkformView);
        talkformview.render();
         var roomview =  Vm.create(this,'roomView', roomView);
        roomview.render();
      }
  });
  return DashboardPage;
});
