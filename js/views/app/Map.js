define([
    'jquery',
    'underscore',
    'views/TransitionHandler',
    'views/app/map/City',
    'views/app/MapNav',
    'views/app/map/Footer',
    'text!templates/app/map.html'
], function($, _, TransitionHandlerView, CityView, MapNavView, FooterView, mapTemplate){
    'use strict';
    
    var MapView = TransitionHandlerView.extend({
        
        footerView: null,
        
        initialize: function(options)
        {
            // view references
            this.appView = options.appView;
            this.mapNavView = null;
            this.footerView = null;
            this.cityViews = [];
            
            // track active city through the view
            this.activeCityView = null;
            
            this.render();
            
            // Initialize transntion-end event/queue handler
            MapView.__super__.initialize.call(this);
        },
        
        render: function()
        {
            var data = {collection:this.collection};
            this.$el.html( _.template( mapTemplate, data ) );
            
            // render cities
            this.renderCities();
            
            // init map nav view and render. the 'el' will be created in this.render()
            this.mapNavView = new MapNavView({
                el: this.$el.find('> nav').get(),
                collection: this.collection, 
                mapView: this
            });
                    
            // initialize footer view (render in initialize)
            this.footerView = new FooterView({
                el: 'footer', 
                mapView: this,
                collection: this.collection
            });
        },
        
        renderCities: function()
        {
            var self = this;
            
            // iterate collection of cities to generate required views
            this.collection.each(function(city) {
                
                // generate view for the city model. this 'el' was generated during MapView.render()
                var cityView = new CityView({
                    el: '.city.'+city.get('color'), 
                    mapView: self, 
                    appView: self.appView, 
                    model: city
                });
                
                //add the view to the local cityViews array to track it.
                self.cityViews.push(cityView);
            });
            
        },
        
        showCity: function(openColor)
        {
            var self = this;
            
            if (this.activeCityView)
            {
                // If the requested city is already active, finish the execution
                if (this.activeColor() === openColor)
                {
                    return;
                }
                
                // If there's another city already active, show the map first 
                // and then execute showCity to show the requested city
                this.showMap(function() {
                    self.showCity(openColor);
                });
                return;
            }
            
            // iterate all city views; show the requested one and hide the rest
            _.each(this.cityViews,function(cityView) {
                
                if (cityView.model.get('color') === openColor)
                {
                    cityView.enter();
                    
                    // add color class to #app
                    self.appView.$el.addClass(cityView.model.get('color'))
                                    .removeClass('map');
                    
                    // track active city
                    self.activeCityView = cityView;
                    
                    // show footer for this city
                    self.footerView.showFor(openColor);
                }
                else
                {
                    cityView.hide();
                }
            });
        },
        
        showMap: function(callback)
        {
            if (this.activeCityView) // if there's an active city, execute "showInMap" in all the city views
            {
                // if there's a callback, attache it to the first map nav item
                if (typeof callback !== 'undefined')
                {
                    var navItem = this.mapNavView.$el.find(':first');
                    this.addToTransitionQueue(navItem, callback);
                }
                
                // remove color classes from #app and add .map
                this.appView.$el.removeClass()
                                .addClass('map');
                // remove tracking of active city
                this.activeCityView = null;
                
                //iterate city views and execute showInMap
                _.each(this.cityViews,function(cityView) {
                    cityView.showInMap();
                });
                
                // show footer for this city
                this.footerView.showFor('map');
            }
            // if a callback has been sent and there isn't an active city, just execute it
            else if (typeof callback !== 'undefined')
            {
                callback.apply();
            }
        },
        
        showNextCity: function()
        {
            var self = this;
            
            // The next iteration won't return anything when the map 
            // is being showed, therefore, show first city view.
            var showNext = function()
            {
                self.showCity(self.cityViews[0].model.get('color'));
            };
            
            // iterate models to check which city is active and define 
            // what would be shown next
            $.each(this.collection.models, function(index, city) {
                
                if (city.isOpened())
                {
                    index++;
                    // If the opened city is the last one, the next IF will result into FALSE
                    if (typeof self.cityViews[index] !== 'undefined')
                    {
                        var nextCity = self.cityViews[index].model;
                        
                        showNext = function()
                        {
                            self.showCity(nextCity.get('color'));
                        };
                    }
                    else
                    {
                        showNext = self.showMap;
                    }
                    return false;
                }
            });
            
            showNext.apply(this);
        },
        
        showPrevCity: function()
        {
            var self = this;
            
            // The next iteration won't return anything when the map 
            // is being showed, therefore, don't do anything.
            var showPrev = function() {};
            
            // iterate models to check which city is active and define 
            // what would be shown as previous city/map
            $.each(this.collection.models, function(index, city) {
                
                if (city.isOpened())
                {
                    index--;
                    // If the opened city is the first one, the next IF will result into FALSE
                    if (typeof self.cityViews[index] !== 'undefined')
                    {
                        var prevCity = self.cityViews[index].model;
                        
                        showPrev = function()
                        {
                            self.showCity(prevCity.get('color'));
                        };
                    }
                    else
                    {
                        showPrev = self.showMap;
                    }
                    return false;
                }
            });
            
            showPrev.apply(this);
        },
        
        activeColor: function()
        {
            if (this.activeCityView)
            {
                return this.activeCityView.model.get('color');
            }
            return 'map';
        }
    });
    
    return MapView;
    
});