'use strict';


requirejs.config({
    paths: {
        jquery: '../components/jquery/dist/jquery',
        bootstrap: '../components/bootstrap/dist/js/bootstrap',
        datatables: "../components/datatables/media/js/jquery.dataTables.min",
        tableTools: "../components/datatables-tabletools/js/dataTables.tableTools",
        dataTablesBootstrap: "../components/Plugins/integration/bootstrap/3/dataTables.bootstrap.min",
    },
    shim: {
        bootstrap: ['jquery'],
        datatables: ["jquery"],
        dataTablesBootstrap: ["datatables", "bootstrap"],
        tableTools: ["dataTablesBootstrap"]
    }
});


require(['bootstrap', 'tableTools'], function () {

    var app = {
        initialize: function () {
			$('table.table').DataTable();
        }
    };

    app.initialize();

});
