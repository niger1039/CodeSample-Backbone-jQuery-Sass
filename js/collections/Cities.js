define([
    'underscore',
    'backbone',
    'models/City'
], function(_, Backbone, City){

    var Cities = Backbone.Collection.extend({
      
        model: City,

        url : function()
        {
            return 'data.php';
        },

        parse: function(data)
        {
            return data;
        },
        
        //Compile an array with the colors of all the cities
        getColors: function()
        {
            var colors = [];
            this.each(function(model) {
                colors.push(model.get('color'));
            });
            
            return colors;
        }
    
    });

    return Cities;

});