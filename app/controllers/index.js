// display popover within a click handler
function doClick() {
	// create the the popover and show it
	var custview = Alloy.createController('custview');
	custview.getView().showMe();
}

$.index.open();