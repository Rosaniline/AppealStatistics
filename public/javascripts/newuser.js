

$(document).ready(function() {

    $('#appealtable').DataTable({
		"paging": false,
		"searching": false,
		"info": false,
		"ajax": "appeals/list",
		"columns": [
			{ data: "_id",
					"visible": 		false,
					"searchable": 	false,
					"orderable": 	false,
					"targets": 		0 	
			},
			{ data: "IssueYear" },
			{ data: "Appellant"	},
			{ data: "Respondent"},
			{ data: "ConfYear"	},
			{ data: "ConfTime"	},
			{ data: "Officer"	},
			{ data: "InCharge"	},
			{ data: "Result"	}
		],
		"sAjaxDataProp": "",
		"columnDefs": [
            {
                "render": function ( data, type, row ) {

                    return data + '/' + row['IssueMonth'] + '/' + row['IssueDay'];
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {

                    return data + '/' + row['ConfMonth'] + '/' + row['ConfDay'];
                },
                "targets": 4
            },
        ]

    });

    $('#appealtable tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );


    $("#addAppeal").click(function(){
	    $("#divAdd").toggle();
	});

    $(function(){
		$("#issueDate").datepicker({
			dateFormat: "yy / mm / dd"
		});

		$("#confDate").datepicker({
			dateFormat: "yy / mm / dd"
		});
	});


} );