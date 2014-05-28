define([
    'underscore',
    'backbone',
    'text!templates/app/mapNav.html'
], function(_, Backbone, mapNavTemplate){
    'use strict';
    
    var MapNavView = Backbone.View.extend({
        
        initialize: function(options)
        {
            // view references
            this.mapView = options.mapView;
            
            this.render();
        },
        
        events: {
            'click a':'showCity'
        },
        
        render: function()
        {
            var data = {collection:this.collection};
            this.$el.append( _.template( mapNavTemplate, data ) );
        },
        
        showCity: function(event)
        {
            var color = this.mapView.appView.getColor(event.currentTarget);
            this.mapView.showCity(color);
        }
    });
    
    return MapNavView;
    
});