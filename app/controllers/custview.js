var args = arguments[0] || {};

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
	Alloy.Globals.theRow = e.row; // set the global obj equal to the tapped row
});

