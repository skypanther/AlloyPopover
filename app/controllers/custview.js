var args = arguments[0] || {},
	rowClicked;

var data = [];
for(var i=0; i<5; i++) {
	data.push({
		id: 'row'+i,
		counter: i, 
		title: 'Row ' + (i+1),
		hasCheck: false
	});
}
$.table.data = data;

$.table.addEventListener('click', function(e) {
	for(var i=0, j=data.length; i<j; i++) {
		data[i].hasCheck = false;
		if(e.rowData.counter == i) data[i].hasCheck = true;
	}
	$.table.data = data;
	rowClicked = e.row; // set the internal variable equal to the tapped row
});

// initialize the popover
$.popover.init({
	title: 'Popover',
	showLeftNavButton: true,
	leftNavButtonTitle: 'Done',
	leftNavCallback: function() {
		// function run after left button is clicked
		if(rowClicked) {
			alert(JSON.stringify(rowClicked));
		}
	},
	showRightNavButton: true,
	rightNavButtonTitle: 'Next',
	rightNavCallback: function() {
		if(rowClicked) {
			alert(JSON.stringify(rowClicked));
		}
	},
	// set to true to disable tapping on backshade to close
	disableBackshadeClose: false,
	// view to show within the popover
	view: args.view,
	openCallback: function() {
		Ti.API.info('The Popover has been opened');
	}
});