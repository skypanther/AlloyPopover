function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "custview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.custview = Ti.UI.createView({
        id: "custview"
    });
    $.__views.custview && $.addTopLevelView($.__views.custview);
    $.__views.table = Ti.UI.createTableView({
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        separatorColor: "#ddd",
        id: "table"
    });
    $.__views.custview.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
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
        Alloy.Globals.theRow = e.row;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;