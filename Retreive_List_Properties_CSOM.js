$(document).ready(function(){
	retrieveListItems();
});

var siteURL = "";

function retrieveListItems() {
	var clientContext = new SP.ClientContext(siteURL);
	var oList = clientContext.get_web().get_lists().getByTitle('ListName');
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Where><Query><Geq><FieldRef Name=\"ID\" />" +
							"<Value Type=\"Number \">1</Value></Geq></Query></Where></View>");
	this.collListItem = oList.getItems(camlQuery);
	
	clientContext.Load(collListItem);
	clientContext.executeQueryAsync(function.createDelegate(this, this.onQuerySuceeded), function.createDelegate(this.onQueryFailed));
	console.log(clientContext);
}						

function onQuerySuceeded(sender, args) {
	var listInfo = "";
	
	var listItemEnumerator = collListItem.getEnumerator();
	
	while(moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		listItemInfo += '\nID:' + oListItem.get_Id() +
			'\nTitle:' + oListItem.get_Item('Title');
	}
	
	console.log(listItemInfo.ToString());
	$('HTMTL Element').text(oList);
	
	function onQueryFailed(sender, args) {
		console.log('Request Failed' + args.get_message() + '\n' + args.get_stackTrace());
	}
}
