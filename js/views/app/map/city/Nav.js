define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/app/map/city/cityNav.html'
], function($, _, Backbone, cityNavTemplate){
    
    var StepsNavView = Backbone.View.extend({
        
        initialize: function(options)
        {
            // view references
            this.stepListView = options.stepListView;
            
            //Bind change of Steps throught the collection to update the CityNavView bullets
            this.stepListView.collection.bind('change:active', this.refresh, this);
            
            this.render();
        },
        
        events: {
            'click li a': 'clickHandler'
        },
        
        render: function()
        {
            var data = {collection:this.collection};
            this.$el.append( _.template( cityNavTemplate, data));
        },
        
        reset: function()
        {
            this.$el.find('li').removeClass('active');
        },
        
        refresh: function()
        {
            var self = this;
            
            // remove 'active' classes before asigning the class to the proper element
            this.reset();
            
            // iterate step models to check which one is active
            // I use jQuery.each because I can break it when I got to 
            // the active step
            $.each(this.collection.models, function(index, step) {
                
                if (step.get('active'))
                {
                    self.$el.find('li:nth-child('+step.get('index')+')').addClass('active');
                    
                    return false;
                }
            });
        },
        
        clickHandler: function(event)
        {
            var index = $(event.target).parent().index();
            this.stepListView.showStep(index+1);
        }
        
    });
    
    return StepsNavView;
    
});