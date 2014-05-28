define([
    'underscore',
    'backbone',
    'models/Step'
], function(_, Backbone, Step){
    'use strict';

    var Steps = Backbone.Collection.extend({
        model: Step
    });

    return Steps;

});