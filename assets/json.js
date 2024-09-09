$(document).ready(function () {
	$(function () {
		$.getJSON("data/podes_purbalingga.json", function (pivot) {
			$("#output_pivot").pivotUI(pivot, {
				cols: ["Sumber Penghasilan Utama"],
				rows: ["Kecamatan"],
				rendererName: "Table",
				rowOrder: "value_a_to_z",
				colOrder: "value_z_to_a",
			});

			$('#loading').hide();

			$('#btnDownload').show();
		});
	});
});

function exportTableToExcel(tableID, filename = '') {
	var downloadLink;
	var dataType = 'application/vnd.ms-excel';
	var tableSelect = document.getElementById(tableID);
	var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

	filename = filename ? filename + '.xls' : 'excel_data.xls';
	downloadLink = document.createElement("a");

	document.body.appendChild(downloadLink);

	if (navigator.msSaveOrOpenBlob) {
		var blob = new Blob(['\ufeff', tableHTML], {
			type: dataType
		});
		navigator.msSaveOrOpenBlob(blob, filename);
	} else {

		downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

		downloadLink.download = filename;

		downloadLink.click();
	}
}