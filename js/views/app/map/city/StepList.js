define([
    'jquery',
    'underscore',
    'views/TransitionHandler',
    'views/app/map/city/Step',
    'collections/Steps',
    'text!templates/app/map/city/stepsList.html'
], function($, _, TransitionHandlerView, StepView, Steps, stepsListTemplate){
    'use strict';
    
    var StepListView = TransitionHandlerView.extend({
        
        initialize: function(options)
        {
            // view references
            this.cityView = options.cityView;
            this.stepViews = [];
            
            // load steps collection from city model data
            this.collection = new Steps(this.cityView.model.get('steps'));
            
            // this variable will track if ul.steps is hidden or not
            this.shown = false;
            
            this.render();
            
            // Initialize transntion-end event/queue handler
            StepListView.__super__.initialize.call(this);
        },
        
        render: function()
        {
            var self = this;
            
            var data = {collection:this.collection};
            this.$el.append( _.template( stepsListTemplate, data));
            
            // iterate through step models to render them
            _.each(this.collection.models, function(step, index){
                
                // set some data in the step model
                step.set({
                    index: index+1,
                    isLast: index === self.collection.models.length-2,
                    active: false
                });
                
                // init step view
                var stepView = new StepView({
                    el: self.$el.find('li:nth-child('+(index+1)+')'),
                    model: step,
                    stepListView: self
                });
                
                // track the step view for future use
                self.stepViews.push(stepView);
            });
        },
        
        reset: function()
        {
            this.shown = false;
            
            this.$el.removeClass('active')
                    .addClass('hidden');
            
            this.hideSteps();
        },
        
        showSteps: function(callback)
        {
            var self = this;
            
            // create the function show steps
            var showSteps = function()
            {
                if (typeof callback !== 'undefined')
                {
                    self.addToTransitionQueue(self.$el, callback);
                }

                self.shown = true;

                self.$el.removeClass('hidden')
                        .addClass('active');
            };
            
            // if the intro is shown, hide it and then show the steps
            if (this.cityView.intro.get('shown'))
            {
                this.cityView.hideIntro(showSteps);
            }
            else
            {
                showSteps.apply();
            }
        },
        
        hideSteps: function()
        {
            // reset each step
            _.each(this.stepViews, function(stepView) {
                
                stepView.reset();
            });
        },
        
        showStep: function(index)
        {
            var self = this;
            
            // if the ul.steps is not show, show it and 
            // call this same function as a callback
            if (!this.shown)
            {
                this.showSteps(function(){
                    
                    self.showStep(index);
                });
                return;
            }
            
            // get the step view to activate
            var stepView = this.stepViews[index-1];
            
            // if the step is not active, show it
            if (!stepView.model.get('active'))
            {
                this.hideSteps();
                this.stepViews[index-1].show();
            }
        }
    });
    
    return StepListView;
    
});