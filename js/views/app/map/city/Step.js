define([
    'jquery',
    'underscore',
    'views/TransitionHandler',
    'text!templates/app/map/city/step.html'
], function($, _, TransitionHandlerView, stepTemplate){
    'use strict';
    
    var StepView = TransitionHandlerView.extend({
        
        initialize: function(options)
        {
            // view references
            this.stepListView = options.stepListView;
            this.cityView = this.stepListView.cityView;
            this.index = options.index;
            
            this.render();
            
            // Initialize transntion-end event/queue handler
            StepView.__super__.initialize.call(this);
        },
        
        events: {
            'click a.next': 'clickNextHandler',
            'click a.x': 'clickXHandler'
        },
        
        render: function()
        {
            // if this step is going to be a benefit, add the proper class
            if (this.model.get('isBenefit'))
            {
                this.$el.addClass('benefits');
            }
            
            // append step template
            this.$el.append( _.template( stepTemplate, {
                city: this.cityView.model,
                step: this.model,
                arrow: !this.model.get('isLast') ? this.model.get('index') : false
            }));
        },
        
        clickNextHandler: function()
        {
            // the "NEXT" link is "next" when the step is active,
            // and it opens the actual step when it's inactive
            var index = this.model.get('index');
            if (this.model.get('active'))
            {
                index++;
            }
            
            this.stepListView.showStep(index);
        },
        
        clickXHandler: function()
        {
            this.stepListView.hideSteps();
        },
        
        reset: function()
        {
            // track that the step is not active anymore
            this.model.set('active',false);
            
            // remove the show-text class in the article
            this.$el.find('article').removeClass('show-text');
            
            // hide the step
            this.$el.removeClass('active');
        },
        
        show: function()
        {
            var self = this;
            
            // when the transition to show the step is over, 
            // show the text inside the article
            var article = this.$el.find('article');
            this.addToTransitionQueue(article, function(){
                self.$el.find('article').addClass('show-text');
            });
            
            // track that the step is active
            this.model.set('active',true);
            
            // show the step
            this.$el.addClass('active');
        }
    });
    
    return StepView;
    
});