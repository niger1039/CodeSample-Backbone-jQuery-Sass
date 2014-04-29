require.config({
    paths: {
        jquery: 'vendor/jquery.min',
        underscore: 'vendor/underscore.min',
        backbone: 'vendor/backbone.min',
        modernizr: 'vendor/modernizr-latest',
        templates: '../templates',
        text: 'vendor/text'
    }
});

require([
    'app'
], function(App){
    App.initialize();
});
