createCharts();

function createCharts() {
	google.load('visualization', '1.0', {'packages':['controls']});
	
	createGoogleChart();
}

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var shortMonths = {'1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0, '11':0, '12':0};
	var shortMonths2 = {'1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0, '11':0, '12':0};
	var shortMonths3 = {'1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0, '11':0, '12':0};
	var shortMonths4 = {'1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0, '10':0, '11':0, '12':0};
	var year = {'1899':0, '2014':0, '2015':0, '2016':0};
	
function createGoogleChart() {
	$('Div Tag for Chart container').text('Loading Chart...');
	
function convertdate (x, formatter) {
	//split up date and time
	xDate = x.split(" ")[0];
	xTime = x.split(" ")[1];
	
	//split off the hour from the minute/second
	xMinSec = xTime.split(":")[1];
	xHour = xTime.split(":")[0];
	
	// set the am or pm suffix
	if (xHour > 12) {
		ampm = "pm";
		xHour -=12;
	} else if (xHour < 12) {
		ampm= "am";
	} else {
		ampm = "pm";
	}
	
	//extract the minute from the minute/second
	xMin = xMinSec.split(":")[0];
	
	//split up the date into day, month (-1), and year
	xDay = xDate.split("-")[2];
	xMonth = shortMonths[xMonth = xDate.split("-")[1]-1];
	xYear = year[xYear = xDate.split("-")[0]];
	
	//format the date as you like
	xFullDate = xMonth + " " + xDay + ", " + xYear;
	
	//format the time as you like
	xFullTime = xHour + ":" + xMin + ampm;
	
	// check the parameter to see which one to return
	if (formatter === "date") {
		return xFullDate;
	} else if (formatter === "time") {
		return xFullTime;
	}
}

function getMonth(dateTime) {
	var date = dateTime.split(" ")[0];
	var month = date.split("-")[1];
	return parseInt(month);
}

function getDate(dateTime) {
	var date = dateTime.split(" ")[0];
	var month = date.split("-")[1];
	return parseInt(date);
}

	$().SPServices({
		webURL: $(this).attr("siteURL"),
		operation: "GetListCollection",
		async: false,
		completefunc: function(xData, Status) {
			$(xData.responseXML).find("List").each(function(){
		if ($(this).attr("ID") == "") {
		$().SPServices({
			operation: "GetListItems",
			async: true,
			listName: "listName"",
			viewName: "",
			rowLimit: "",
			CAMLViewFields: "<ViewFields><FieldRef Name=\"Field1\" /><FieldRef Name=\"Date_x0020_Field\" /></ViewFields>",
			CAMLQuery: "",
			completefunc: function(xData, Status)
			{
				$(xData.responseXML).SPFilterNode("z:row").each(function() 
				{
					var itemCat = $(this).attr("ows_Field");
					var compDate = $(this).attr("ows_Date_x0020_Field");
					var month = getMonth(compDate);
					var date = getDate(compDate);
					// to only get the date
					//convertDate(compDate, "date");
					//convertDate(compDate, "date") + "" + convertDate(compdate, "time");
					year[date] = (itemCat == "Closed") ? year[date] + 1: year[date];
					if (compDate < [1900]) {
						shortMonths[month] = (itemCat == "Closed") ? shortMonths[month] + 1: shortMonths[month];
					} else if (compDate < [2015]) {
						shortMonths2[month] = (itemCat == "Closed") ? shortMonths2[month] + 1: shortMonths2[month];
					} else if (compDate < [2016]) {
						shortMonths3[month] = (itemCat == "Closed") ? shortMonths3[month] + 1: shortMonths3[month];
					} else if (compDate < [2017]) {
						shortMonths4[month] = (itemCat == "Closed") ? shortMonths4[month] + 1: shortMonths4[month];
					} else {
						return null;
					}
				});
				google.setOnLoadCallback(createGoogleChartDraw);
						}
					});
				}
			});
		}
	});
}

function createGoogleChartDraw() {
var data = new google.visualization.DataTable();
data.addColumn('string', 'Year Selection');
data.addColumn('number', 'Year');
data.addColumn('number', 'Jan');
data.addColumn('number', 'Feb');
data.addColumn('number', 'Mar');
data.addColumn('number', 'Apr');
data.addColumn('number', 'May');
data.addColumn('number', 'Jun');
data.addColumn('number', 'Jul');
data.addColumn('number', 'Aug');
data.addColumn('number', 'Sep');
data.addColumn('number', 'Oct');
data.addColumn('number', 'Nov');
data.addColumn('number', 'Dec');
data.addRows([
['1899', year[1899], shortMonths[1], shortMonths[2], shortMonths[3], shortMonths[4], shortMonths[5], shortMonths[6], shortMonths[7], shortMonths[8], shortMonths[9], shortMonths[10], shortMonths[11], shortMonths[12]],
['2014', year[2014], shortMonths2[1], shortMonths2[2], shortMonths2[3], shortMonths2[4], shortMonths2[5], shortMonths2[6], shortMonths2[7], shortMonths2[8], shortMonths2[9], shortMonths2[10], shortMonths2[11], shortMonths2[12]],
['2015', year[2015], shortMonths3[1], shortMonths3[2], shortMonths3[3], shortMonths3[4], shortMonths3[5], shortMonths3[6], shortMonths3[7], shortMonths3[8], shortMonths3[9], shortMonths3[10], shortMonths3[11], shortMonths3[12]],
['2016', year[2016], shortMonths4[1], shortMonths4[2], shortMonths4[3], shortMonths4[4], shortMonths4[5], shortMonths4[6], shortMonths4[7], shortMonths4[8], shortMonths4[9], shortMonths4[10], shortMonths4[11], shortMonths4[12]]
]);

	var datePicker = new google.visualization.ControlWrapper({
	'controlType': 'CategoryFilter',
	'containerId': 'Div tag for control',
	'options': {
		'filterColumnIndex': 0,
		'ui': {
			'labelStacking': 'horizontal',
			'allowTyping': false,
			'allowMultiple': false
			}
		}
	});
	
	var chart = new google.visualization.ChartWrapper({
	'chartType': 'ComboChart',
	'containerID': 'Div tag for chart wrapper',
	'options': {
		'height': 400,
		'fontSize': 15,
		'legend': { position: 'bottom', maxLines: 3},
		isStacked: true,
		seriesType: "bars",
		series: {0: {type:"line"}}
		}
	});
	
	var dashboard = new google.visualization.Dashboard(document.getElementById('DIV tag for dashboard').
	bind(datePicker, chart).
	draw(data);
}
