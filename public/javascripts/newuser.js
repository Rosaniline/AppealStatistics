

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


function appealPostDelete() {




    var selectedRow = $("#appealtable .selected td");
	var tableAttribute = $("#appealtable th");

	var tableLength = tableAttribute.length;
	var numSelectedRow = selectedRow.length/tableLength;

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/appeals/deleteappeal");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "numSelectedRow");
    hiddenField.setAttribute("value", numSelectedRow);
    form.appendChild(hiddenField);

	for (var i = 0; i < selectedRow.length; i++) {
		
    	var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", LowerizeFirstLetter(tableAttribute.eq(i%tableLength).text()));
        hiddenField.setAttribute("value", selectedRow.eq(i).text());	

        form.appendChild(hiddenField);

	};

	document.body.appendChild(form);
	form.submit();
	// console.log(form);

	// for (var i = 0; i < numSelectedRow; i++) {

	//     var form = document.createElement("form");
	//     form.setAttribute("method", "post");
	//     form.setAttribute("action", "/appeals/deleteappeal");

	//     for (var j = i*tableLength; j < (i + 1)*tableLength; j++) {

	//     	var hiddenField = document.createElement("input");
	//         hiddenField.setAttribute("type", "hidden");
	//         hiddenField.setAttribute("name", LowerizeFirstLetter(tableAttribute.eq(j).text()));
	//         hiddenField.setAttribute("value", selectedRow.eq(j).text());

	//         form.appendChild(hiddenField);
	//     };

	//     document.body.appendChild(form);
	//     form.submit();

	//     console.log(form);
		
	// };





}

function LowerizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}




