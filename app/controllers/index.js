
// initialize popover within a click handler
function doClick() {
	// create the view that will be shown within the popover
	var custview = Alloy.createController('custview');
	// create and initialize the popover
	var pop = Alloy.createWidget('com.skypanther.alloypopover');
	pop.init({
		title: 'Popover',
		showLeftNavButton: true,
		leftNavButtonTitle: 'Done',
		leftNavCallback: function() {
			// function run after left button is clicked
			alert(JSON.stringify(Alloy.Globals.theRow));
		},
		showRightNavButton: true,
		rightNavButtonTitle: 'Next',
		rightNavCallback: function() {
			alert(JSON.stringify(Alloy.Globals.theRow));
		},
		// set to true to disable tapping on backshade to close
		disableBackshadeClose: false,
		// view to show within the popover
		view: custview.getView()
	});
	// call showMe() to display the popover
	pop.showMe();
}

$.index.open();
