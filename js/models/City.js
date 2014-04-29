define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    
    var City = Backbone.Model.extend({
        DISPLAY_OPEN: 'opened',
        DISPLAY_HIDE: 'hidden',
        DISPLAY_MAP: 'inMap',
        
        defaults : {
            color : null, 
            display: 'inMap'
        },
        
        //
        // Set of methods to handle the DISPLAY state of the City
        //
        open: function()
        {
            this.set('display',this.DISPLAY_OPEN);
        },
        isOpened: function()
        {
            return this.get('display') === this.DISPLAY_OPEN;
        },
        
        hide: function()
        {
            this.set('display',this.DISPLAY_HIDE);
        },
        isHidden: function()
        {
            return this.get('display') === this.DISPLAY_HIDE;
        },
        
        showInMap: function()
        {
            this.set('display',this.DISPLAY_MAP);
        },
        isInMap: function()
        {
            return this.get('display') === this.DISPLAY_MAP;
        }
    });

    return City;
    
});
