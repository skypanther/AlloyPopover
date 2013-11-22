function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.skypanther.alloypopover/" + s : s.substring(0, index) + "/com.skypanther.alloypopover/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.skypanther.alloypopover");
    this.__widgetId = "com.skypanther.alloypopover";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.popover = Ti.UI.createWindow({
        navBarHidden: true,
        zIndex: 2,
        backgroundColor: "transparent",
        id: "popover"
    });
    $.__views.popover && $.addTopLevelView($.__views.popover);
    $.__views.backshade = Ti.UI.createView({
        backgroundColor: "pink",
        opacity: .6,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        id: "backshade"
    });
    $.__views.popover.add($.__views.backshade);
    $.__views.shadow = Ti.UI.createView({
        backgroundColor: "#333",
        width: "75%",
        height: "80%",
        opacity: .6,
        id: "shadow"
    });
    $.__views.popover.add($.__views.shadow);
    $.__views.wrapper = Ti.UI.createView({
        backgroundColor: "white",
        width: "75%",
        height: "80%",
        borderColor: "#777",
        borderWidth: 3,
        borderRadius: 4,
        id: "wrapper"
    });
    $.__views.popover.add($.__views.wrapper);
    $.__views.titlebar = Ti.UI.createView({
        backgroundColor: "#777",
        height: 40,
        top: 0,
        width: Ti.UI.FILL,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "100%",
                y: "100%"
            },
            endPoint: {
                x: "100%",
                y: "0"
            },
            colors: [ {
                color: "#666",
                offset: 0
            }, {
                color: "#555",
                offset: .5
            }, {
                color: "#777",
                offset: 1
            } ]
        },
        id: "titlebar"
    });
    $.__views.wrapper.add($.__views.titlebar);
    $.__views.leftnavbutton = Ti.UI.createLabel({
        backgroundColor: "transparent",
        left: 5,
        bottom: 5,
        top: 5,
        width: 50,
        height: 30,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundImage: "none",
        borderColor: "#444444",
        borderWidth: 1,
        color: "#fff",
        text: "Left",
        visible: false,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#aaa"
            }, {
                color: "#1a48a4"
            } ]
        },
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: 2,
        id: "leftnavbutton"
    });
    $.__views.titlebar.add($.__views.leftnavbutton);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: 16
        },
        fontWeight: "bold",
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Title",
        width: Ti.UI.SIZE,
        zIndex: 1,
        id: "title"
    });
    $.__views.titlebar.add($.__views.title);
    $.__views.rightnavbutton = Ti.UI.createLabel({
        backgroundColor: "transparent",
        right: 5,
        bottom: 5,
        top: 5,
        width: 50,
        height: 30,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundImage: "none",
        borderColor: "#444",
        borderWidth: 1,
        color: "#fff",
        text: "Right",
        visible: false,
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#aaa"
            }, {
                color: "#1a48a4"
            } ]
        },
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: 2,
        id: "rightnavbutton"
    });
    $.__views.titlebar.add($.__views.rightnavbutton);
    $.__views.contents = Ti.UI.createView({
        backgroundColor: "white",
        top: 40,
        left: 2,
        right: 2,
        bottom: 2,
        id: "contents"
    });
    $.__views.wrapper.add($.__views.contents);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var disableBackshadeClose = false;
    $.init = function(args) {
        args || (args = {});
        args.disableBackshadeClose && (disableBackshadeClose = true);
        $.title.text = args.title ? args.title : "";
        if (args && args.showLeftNavButton) {
            $.leftnavbutton.text = args.leftNavButtonTitle ? args.leftNavButtonTitle : "";
            $.leftnavbutton.visible = true;
            $.leftnavbutton.addEventListener("click", function(e) {
                e.bubbles = false;
                e.cancelBubble = true;
                if (args && args.view.children) {
                    var kids = args.view.children;
                    if (kids && kids.length) for (var i = 0, j = kids.length; j > i; i++) try {
                        kids[i].blur();
                    } catch (err) {}
                }
                "function" == typeof args.leftNavCallback && args.leftNavCallback();
                $.hideMe();
            });
        }
        if (args && args.showRightNavButton) {
            $.rightnavbutton.text = args.rightNavButtonTitle ? args.rightNavButtonTitle : "";
            $.rightnavbutton.visible = true;
            $.rightnavbutton.addEventListener("click", function(e) {
                e.bubbles = false;
                e.cancelBubble = true;
                if (args && args.view.children) {
                    var kids = args.view.children;
                    if (kids && kids.length) for (var i = 0, j = kids.length; j > i; i++) try {
                        kids[i].blur();
                    } catch (err) {}
                }
                args.rightNavCallback();
                $.hideMe();
            });
        }
        args && args.view && $.contents.add(args.view);
    };
    var shadowOffset = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix().translate(3, 3),
        duration: 1
    });
    $.shadow.animate(shadowOffset);
    var duration = 200;
    var showAnim = Titanium.UI.createAnimation({
        opacity: 1,
        duration: duration
    }), hideAnim = Titanium.UI.createAnimation({
        opacity: 0,
        duration: duration / 2
    });
    $.popover.addEventListener("click", function(e) {
        if ("backshade" == e.source.id && !disableBackshadeClose) {
            $.popover.animate(hideAnim);
            setTimeout(function() {
                $.popover.close();
            }, duration);
        }
    });
    $.hideMe = function() {
        $.popover.animate(hideAnim);
        setTimeout(function() {
            $.popover.close();
        }, duration);
    };
    $.showMe = function(theArgs) {
        var args = theArgs || {};
        if (args.view) {
            try {
                $.contents.removeAllChildren();
            } catch (err) {
                alert(JSON.stringify(err));
            }
            $.contents.add(args.view);
        }
        $.popover.opacity = 0;
        $.popover.open();
        $.popover.animate(showAnim);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;