// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'view'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions'      : 'defaultAction' 
    }
  });
  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter;
  
    router.on('route:defaultAction', function (actions) {
      
      require(['views/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
        
        dashboardPage.render();
      });
    });  
  };
  return {

    initialize: initialize
  };
});
