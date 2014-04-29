define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/app/contact.html'
], function($, _, Backbone, contactTemplate){
    
    var ContactView = Backbone.View.extend({
        
        initialize: function(options)
        {
            // view references
            this.appView = options.appView;
            
            this.render();
        },
        
        events: {
            'click button': 'hide'
        },
        
        render: function()
        {
            this.$el.append( _.template( contactTemplate, {} ) );
        },
        
        hide: function()
        {
            this.$el.addClass('hidden');
            var activeColor = this.appView.mapView.activeColor();
            this.appView.mapView.footerView.showFor(activeColor);
        },
        
        show: function()
        {
            this.$el.removeClass('hidden');
            this.appView.mapView.footerView.showFor('blue');
        }
        
    });
    
    return ContactView;
    
});