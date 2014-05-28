define([
    'jquery',
    'underscore',
    'views/TransitionHandler',
    'views/app/map/city/StepList',
    'views/app/map/city/Nav',
    'models/Intro',
    'text!templates/app/map/city.html'
], function($, _, TransitionHandlerView, StepListView, CityNavView, Intro, cityTemplate){
    'use strict';
    
    var CityView = TransitionHandlerView.extend({
        
        initialize: function(options)
        {
            // view references
            this.mapView = options.mapView;
            this.appView = options.appView;
            this.stepListView = null;
            this.cityNavView = null;
            
            // initialize intro model
            this.intro = new Intro(this.model.get('intro'));
            
            this.render();
            
            // bind display change of the city
            this.model.bind('change:display', this.onDisplayChangeHandler, this);
            
            // Initialize transntion-end event/queue handler
            CityView.__super__.initialize.call(this);
        },
        
        events: {
            'click .intro button': 'clickIntroButtonHandler',
            'click .explore-more': 'clickExploreMoreHandler'
        },
        
        render: function()
        {
            // render city template
            this.$el.append( _.template( cityTemplate, {
                city: this.model,
                intro: this.intro
            }));
            
            // initialize steps view (render in initialize)
            this.stepListView = new StepListView({
                el: this.$el.find('ul.steps').get(), 
                cityView: this
            });
            
            // initialize city nav view (render in initialize)
            this.cityNavView = new CityNavView({
                el: this.$el.find('nav').get(),
                collection: this.stepListView.collection,
                stepListView: this.stepListView
            });
        },
        
        onDisplayChangeHandler: function()
        {
            if (this.model.isOpened())
            {
                //if model just opened, show intro
                this.showIntro();
            }
            else if (this.model.isHidden() || this.model.isInMap())
            {
                //if model is not opened, reset structure
                this.reset();
            }
        },
        
        clickIntroButtonHandler: function()
        {
            var self = this;
            
            // hide the intro and show first step
            this.hideIntro(function()
            {
                self.stepListView.showStep(1);
            });
        },
        
        clickExploreMoreHandler: function()
        {
            this.mapView.showNextCity();
        },
        
        enter: function()
        {
            var self = this;
            
            // if the city is currently opened, finish execution
            if (this.model.isOpened())
            {
                return;
            }
            
            // hide #contact just in case
            this.appView.contactView.hide();
            
            // track background transition end to track the end of the city opening
            var bg = this.$el.find('> .background');
            this.addToTransitionQueue(bg, function() {
                //If the transition wasn't interrupted, when it
                //finishes the $el should have the class 'active'.
                //If so, set city as opened after transition finishes
                if (self.$el.hasClass('active'))
                {
                    self.model.open();
                }
            });
            
            // show city
            this.$el.addClass('active');
        },
        
        showInMap: function()
        {
            var self = this;
            
            // track background transition end to track the end of the city being shown in the map
            var bg = this.$el.find('> .background');
            this.addToTransitionQueue(bg, function() {
                //If the transition wasn't interrupted, when it
                //finishes the $el shouldn't have the classes 'inactive' and 'active'
                //If so, set city as in map view after transition finishes
                if (!self.$el.hasClass('inactive') && !self.$el.hasClass('active'))
                {
                    self.model.showInMap();
                }
            });
            
            // show the city in map view
            this.$el.removeClass('active inactive');
        },
        
        hide: function()
        {
            var self = this;
            
            // track background transition end to track the end of the city hiding
            var bg = this.$el.find('> .background');
            this.addToTransitionQueue(bg, function() {
                //If the transition wasn't interrupted, when it
                //finishes the $el should have the class 'inactive'.
                //If so, set city as hidden after transition finishes
                if (self.$el.hasClass('inactive')) {
                    
                    self.model.hide();
                }
            });
            
            // hide the city
            this.$el.addClass('inactive');
        },
        
        reset: function()
        {
            // hide the intro
            this.hideIntro();
            
            // reset steps
            this.stepListView.reset();
            
            // reset city nav
            this.cityNavView.reset();
        },
        
        showIntro: function()
        {
            // show intro
            this.$el.find('.intro')
                    .removeClass('hidden')
                    .addClass('active');
            
            // track intro being shown
            this.intro.set('shown',true);
        },
        
        hideIntro: function(callback)
        {
            // get intro
            var intro = this.$el.find('.intro');
            
            // if there's a callback, attach it to the queue to be 
            // executed after the intro transition-end event is fired
            if (typeof callback !== 'undefined')
            {
                this.addToTransitionQueue(intro, callback);
            }
            
            // hide the intro
            intro.addClass('hidden')
                 .removeClass('active');
            
            // track intro not being shown
            this.intro.set('shown',false);
        }
    });
    
    return CityView;
    
});