# AlloyPopover

A Titanium Alloy-ready popover component for iOS and Android (probably works on Tizen & BB10, but untested). This component somewhat replicates the iPad-specific iPad control. It does _not_ instantiate Ti.UI.iPad.PopOver on iOS.

<img src="https://raw.github.com/skypanther/AlloyPopover/master/iphone.png" width="300"> <img src="https://raw.github.com/skypanther/AlloyPopover/master/android.png" width="300">

## Instructions

1. Download & unzip the dist/alloypopover.zip file
2. Copy it to your project's app/widgets folder
3. Modify app/config.json:
```
"dependencies": {
    "com.skypanther.alloypopover": "1.0"
}
```
4. Instantiate in your controller following the example code below. 
5. Optional, style the popover following the instructions below

### Example:

```JavaScript
// in this example, initialize popover within a click handler
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
		showRightNavButton: false,
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

```

### Passing child views in markup example:
You can also use the new Alloy (1.3.0) ability to pass views to widgets using XML markup.

####popover.xml - popover view
```JavaScript
<Alloy>
	<Widget id="popover" src="com.skypanther.alloypopover">
		<TableView id="table"/>
	</Widget>
</Alloy>
```

#####popover.js - popover controller
```JavaScript
// initialize the popover
$.popover.init({
	title: 'Popover',
	showLeftNavButton: true,
	leftNavButtonTitle: 'Done',
	leftNavCallback: function() {
		// function run after left button is clicked
	},
	showRightNavButton: true,
	rightNavButtonTitle: 'Next',
	rightNavCallback: function() {
	},
	// set to true to disable tapping on backshade to close
	disableBackshadeClose: false,
	// view to show within the popover (if using this method of passing the view. If undefined, the widget child views from the view will be used)
	view: args.view
});
```

### Styling the popover

You can override the default styles by adding any of the following selectors to your project's app/styles/app.tss file or if using XML child views, to the app/styles/popover.tss file:

```
"#popover": {}, /* window containing popover */
"#backshade": {}, /* background */
"#shadow[platform=ios]": {}, /* iOS only, shadow around popover contents */
"#wrapper": {}, /* border and container around contents */
"#titlebar": {}, /* title bar */
"#leftnavbutton": {}, /* left title bar button */
"#title": {}, /* title label */
"#rightnavbutton": {}, /* right title bar button */
"#contents": {} /* content area */
```

# Author

Tim Poulsen, @skypanther

## License

MIT License

Copyright &copy; 2013, Skypanther Studios, Inc.
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"Appcelerator" and "Titanium" are trademarks or registered trademarks of Appcelerator, Inc.