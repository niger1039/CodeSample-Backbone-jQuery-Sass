define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/Home',
    'views/app/App'
], function($, _, Backbone, HomeView, AppView) {
  
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        
        routes: {
            //Only routes necesary for this simple app
            'app': 'showApp',
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter();

        app_router.on('route:showApp', function(){
            // Initialize AppView (it'll be rendered in the initialize)
            new AppView();
        });

        app_router.on('route:defaultAction', function (actions) {
            // Initialize HomeView (it'll be rendered in the initialize)
            new HomeView();
        });

        Backbone.history.start();
    };
    
    return { 
        initialize: initialize
    };
});
