define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home/home.html'
], function($, _, Backbone, homeTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({
        
        el: $("#app"),
        
        initialize: function()
        {
            // render view
            this.render();
        },

        render: function()
        {
            this.$el.html( _.template( homeTemplate, {} ) );
        }
    
    });

    return HomeView;
  
});
