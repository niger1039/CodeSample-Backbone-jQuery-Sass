define([
    'underscore',
    'backbone',
    'models/Step'
], function(_, Backbone, Step){

    var Steps = Backbone.Collection.extend({
        model: Step
    });

    return Steps;

});