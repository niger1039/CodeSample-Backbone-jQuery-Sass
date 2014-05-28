define([
    'jquery',
    'underscore',
    'backbone',
    'views/app/Map',
    'views/app/Contact',
    'collections/Cities',
    'text!templates/app/app.html'
], function($, _, Backbone, MapView, ContactView, Cities, appTemplate){
    'use strict';
    
    var AppView = Backbone.View.extend({
        
        el: $("#app"),
        
        initialize: function()
        {
            // view references
            this.mapView = null;
            this.contactView = null;
            
            // colors of active cities
            this.colors = null;
            
            this.render();
        },
        
        events: {
            'click .contact' : 'showContact'
        },
        
        render: function()
        {
            var self = this;
            
            // fetch cities data
            this.collection = new Cities();
            this.collection.fetch({
                dataType: 'jsonp',
                success: function()
                {
                    // get the colors of the cities
                    self.colors = self.collection.getColors();
                    
                    // show the main app template
                    var data = {collection:self.collection};
                    self.$el.removeClass()
                            .addClass('map')
                            .empty()
                            .html( _.template( appTemplate, data ) );
                    
                    // initialize map view (render in initialize)
                    self.mapView = new MapView({
                        el: '#map', 
                        appView: self,
                        collection: self.collection
                    });
                    
                    // initialize contact view (render in initialize)
                    self.contactView = new ContactView({
                        el: '#contact', 
                        appView: self
                    });
                }
            });
        },
        
        showContact: function()
        {
            this.contactView.show();
        },
        
        // get the color class from any object. 
        // if a color isn't found, return null
        getColor: function(obj)
        {
            var response = null;
            
            $.each(this.colors, function(index, color) {
                
                if ($(obj).hasClass(color))
                {
                    response = color;
                    return false;
                }
            });
            
            return response;
        }
    });
    
    return AppView;
    
});