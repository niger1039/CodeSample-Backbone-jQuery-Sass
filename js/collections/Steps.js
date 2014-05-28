define([
    'backbone',
    'models/Step'
], function(Backbone, Step){
    'use strict';

    var Steps = Backbone.Collection.extend({
        model: Step
    });

    return Steps;

});