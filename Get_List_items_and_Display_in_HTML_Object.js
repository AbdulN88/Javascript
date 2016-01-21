$(document).ready(function () {
	fngetData();
});

function fngetData() {
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: "listName",
		viewName: "",
		rowLimit: "",
		CAMLViewFields: "<ViewFields><FieldRef Name=\"Title\" /></ViewFields>",
		completefunc: function (xData, Status)
		{
			$(xData.responseXML).SPFilterNode("z:row").each(function()
				var sprintTitle = $(this).attr("ows_Title");
				var schedDate = $(this).attr("ows_Date_x0020_Field");
				var curDueDate = $(this).attr("ows_Date_x0020_Field2");
				document.getElementById("DIV ID Element").innerHTML = "+ sprintTitle +";
			});
		}
	});
}
