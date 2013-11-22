function Controller() {
    function doClick() {
        var custview = Alloy.createController("custview");
        var pop = Alloy.createWidget("com.skypanther.alloypopover");
        pop.init({
            title: "Popover",
            showLeftNavButton: true,
            leftNavButtonTitle: "Done",
            leftNavCallback: function() {
                alert(JSON.stringify(Alloy.Globals.theRow));
            },
            showRightNavButton: true,
            rightNavButtonTitle: "Next",
            rightNavCallback: function() {
                alert(JSON.stringify(Alloy.Globals.theRow));
            },
            disableBackshadeClose: false,
            view: custview.getView()
        });
        pop.showMe();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        top: 20,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Show the popover",
        id: "label",
        top: "5"
    });
    $.__views.index.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;