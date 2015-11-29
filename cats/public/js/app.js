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
			var table = $('table.table').DataTable();

            function format(data) {
                var el = $('<img>'),
                    formId = data.instanceID,
                    details = data.details,
                    name = details.SD_Deploy_Photo || details.SD_Photo || details.Device_Install || details.Device_Install_Photo || details.SD_Maint_Photo;

                el.attr({
                    src: 'https://www.commcarehq.org/a/swb-opphack/reports/form_data/'+formId+'/download-attachment/?attachment=' + name,
                    alt: 'No image!!'
                });

                el = $('<div class="row">')
                    .append($('<div class="col-sm-3">').append(el))
                    .append($('<div class="col-sm-8">').append($('<pre>').text(JSON.stringify(data.details, null, 4))));

                return el;
            }

            $('.viewActivities').click(function () {
                var tr = $(this).closest('tr'),
                    row = table.row(tr),
					path = $(this).data('path');

					if ( row.child.isShown() ) {
						row.child.hide();
						tr.removeClass('shown');
					}
					else {
        				$.get(path).success(function (data) {
                            row.child(format(data));
                        });
						row.child( 'Loading..' ).show();
						tr.addClass('shown');
					}
                return false;
            });
        }
    };

    app.initialize();

});
