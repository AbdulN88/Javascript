$(document).ready(function() {
$(".btn-click").click(function(){
var $row = $(this).closest("tr"),        // Finds the closest row <tr> 
    $tds = $row.find("td"); // Finds the 2nd <td> element
$tds.closest("td").html( "<input />" );   
});
});
