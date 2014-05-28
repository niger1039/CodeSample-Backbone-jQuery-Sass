/**
 * Propper use of this class:
 * 1) Include the file in the define, set a new object, extend the new view from the new 
 *    object, and call {NewView}.__super__.initialize.call(this);
 *      
 *    define(['views/TransitionHandlerView'...], function(TransitionHandlerView) {
 *        var NewView = TransitionHandlerView.extend({
 *            initialize: function() {
 *                ... your code ...
 *                
 *                NewView.__super__.initialize.call(this);
 *            }
 *        });
 *    });
 *    
 * 2) To use the transition queue, just do this:
 *    this.addToTransitionQueue({DOM Object to assign the queue}, callback);
 *    
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'modernizr' //modernizr is not yet ready for AMD, so I'll use the global variable :(
], function($, _, Backbone){
    'use strict';

    var TransitionHandlerView = Backbone.View.extend({
        
        // If the usage instructions are followed properly, this method 
        // should be called using the context of the child class, therefore
        // using "this" will refer to said class.
        initialize: function()
        {
            // if the events object wasn't set, create it
            if (typeof this.events === 'undefined')
            {
                this.events = {};
            }
            
            // Using modernizr, this detects what transition-end event 
            // should be used
            var transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
            
            // Set transition-end event
            this.events[transEndEventName] = 'transitionEndsHandler';
            
            // Add a few methods to the child class
            _.extend(this, {
                
                // this handler will be called after the end of the transitions 
                // and analize the queue in the child objects
                transitionEndsHandler: function(event)
                {
                    var queue = $(event.target).data('transition_queue');
                    if (queue && queue.length)
                    {
                        // if the transition queue exists and it has items in it, 
                        // execute them by shifting the callbacks from it.
                        while (queue.length)
                        {
                            var handler = $(event.target).data('transition_queue').shift();
                            handler.apply();
                        }
                    }
                },
                
                // helper to add a callback to an element's queue
                addToTransitionQueue: function(el, callback)
                {
                    el.data('transition_queue', el.data('transition_queue') || []);
                    el.data('transition_queue').push(callback);
                }
            });
        }
    
    });

    return TransitionHandlerView;
  
});
