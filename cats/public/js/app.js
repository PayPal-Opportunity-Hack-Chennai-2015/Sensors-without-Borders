'use strict';


requirejs.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        bootstrap: '../components/bootstrap/dist/js/bootstrap'
    },
    shim: {
        bootstrap: ['jquery']
    }
});


require(['bootstrap'], function () {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});
