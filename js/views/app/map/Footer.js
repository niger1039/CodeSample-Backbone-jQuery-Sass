define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/app/map/footer.html'
], function($, _, Backbone, footerTemplate){
    
    var FooterView = Backbone.View.extend({
        
        initialize: function(options)
        {
            // view references
            this.mapView = options.mapView;
            this.appView = this.mapView.appView;
            this.icons = [];
            
            this.render();
        },
        
        events: {
            'click .icon a' : 'clickIconHandler',
            'click .prev a' : 'clickPrevHandler',
            'click .next a' : 'clickNextHandler'
        },
        
        render: function()
        {
            var self = this;
            
            var data = {collection:this.collection};
            this.$el.html( _.template( footerTemplate, data ) );
            this.icons = this.$el.find('li.icon');
            
            // hack to always hover the sprite icon together with the li
            this.icons.on('mouseover',function(e){e.stopPropagation(); self.hover(e.currentTarget);});
            this.icons.on('mouseout',function(e){e.stopPropagation(); self.unhover(e.currentTarget);});
        },
        
        clickIconHandler: function(event)
        {
            // get color from clicked icon
            var color = $(event.currentTarget).parent().data('color');
            
            // hide #contact just in case is being shown
            this.appView.contactView.hide();
            
            // if the color is null, show the map, if not, the city
            if (color && color !== 'map')
            {
                this.appView.mapView.showCity(color);
            }
            else
            {
                this.appView.mapView.showMap();
            }
        },
        
        clickPrevHandler: function()
        {
            this.appView.mapView.showPrevCity();
        },
        
        clickNextHandler: function()
        {
            this.appView.mapView.showNextCity();
        },
        
        showFor: function(cityColor, forContact)
        {
            this.icons
                    .removeClass('active')
                    .each(function()
            {
                // add active to icon
                if (cityColor === $(this).data('color'))
                {
                    $(this).addClass('active');
                }
                
                // get sprite icon
                var sprite_icon = $(this).find('span.sprite');
                
                // remove current class
                $(sprite_icon).removeClass($(this).data('class'));
                
                // add new class
                var new_class = cityColor+'_'+$(this).data('color');
                $(sprite_icon).addClass(new_class);
                $(this).data('class',cityColor+'_'+$(this).data('color'));
            });
        },
        
        hover: function(li)
        {
            if (!$(li).hasClass('active'))
            {
                var sprite_icon = $(li).find('span.sprite');
                if (sprite_icon.hasClass($(li).data('class')))
                {
                    sprite_icon
                            .removeClass($(li).data('class'))
                            .addClass($(li).data('class')+'_hover');
                }
            }
        },
        
        unhover: function(li)
        {
            var sprite_icon = $(li).find('span.sprite');
            var classes = sprite_icon.attr('class').split(' ');
            _.each(classes, function(_class) {
                if (_class.indexOf('_hover') !== -1)
                {
                    $(sprite_icon).removeClass(_class);
                }
            });
            sprite_icon.addClass($(li).data('class'));
        }
    });
    
    return FooterView;
    
});