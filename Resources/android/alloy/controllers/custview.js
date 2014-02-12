function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "custview";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.popover = Alloy.createWidget("com.skypanther.alloypopover", "widget", {
        id: "popover",
        children: [ $.__views.table ],
        __parentSymbol: __parentSymbol
    });
    $.__views.popover && $.addTopLevelView($.__views.popover);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var rowClicked, args = arguments[0] || {};
    var data = [];
    for (var i = 0; 5 > i; i++) data.push({
        id: "row" + i,
        counter: i,
        title: "Row " + (i + 1),
        hasCheck: false
    });
    $.table.data = data;
    $.table.addEventListener("click", function(e) {
        for (var i = 0, j = data.length; j > i; i++) {
            data[i].hasCheck = false;
            e.rowData.counter == i && (data[i].hasCheck = true);
        }
        $.table.data = data;
        rowClicked = e.row;
    });
    $.popover.init({
        title: "Popover",
        showLeftNavButton: true,
        leftNavButtonTitle: "Done",
        leftNavCallback: function() {
            alert(JSON.stringify(rowClicked));
        },
        showRightNavButton: true,
        rightNavButtonTitle: "Next",
        rightNavCallback: function() {
            alert(JSON.stringify(rowClicked));
        },
        disableBackshadeClose: false,
        view: args.view
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;