// Require.js allows us to configure shortcut alias
require.config({
   urlArgs: "bust="+(new Date()).getTime(),
  paths: {
    jquery: 'libs/jquery/jquery-min',
    jq_pack: 'libs/jquery_package',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
    order: 'libs/require/order',
    templates: '../templates',
    socket:'../socket.io/socket.io'
  }
});
require([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'router',
  'view',
  'socket'
  ],
  function($,_,Backbone,AppView,Router,View,Socket){
    window.$ = $;
    window.Backbone = Backbone;
window._ = _;

 window.io  = io;
window.Router = Router;
 _.templateSettings = {
        interpolate : /\{\{=(.+?)\}\}/g,
        escape:  /\{\{-([\s\S]+?)\}\}/g, 
        evaluate:  /\{\{([\s\S]+?)\}\}/g
      };
  var appView = View.create({}, 'AppView', AppView);
  Router.initialize({appView: appView});
  appView.render(); 
  
});




