var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

var Controller = function() {
    function getControllerParam() {
        return self.__widgetId ? {
            widgetId: self.__widgetId,
            name: self.__controllerPath
        } : self.__controllerPath;
    }
    var roots = [];
    var self = this;
    this.__iamalloy = true;
    _.extend(this, Backbone.Events, {
        __views: {},
        setParent: function(parent) {
            var len = roots.length;
            if (!len) return;
            this.parent = parent.__iamalloy ? parent.parent : parent;
            for (var i = 0; len > i; i++) roots[i].__iamalloy ? roots[i].setParent(this.parent) : this.parent.add(roots[i]);
        },
        addTopLevelView: function(view) {
            roots.push(view);
        },
        getTopLevelViews: function() {
            return roots;
        },
        getView: function(id) {
            if ("undefined" == typeof id || null === id) return roots[0];
            return this.__views[id];
        },
        getViews: function() {
            return this.__views;
        },
        destroy: function() {},
        getViewEx: function(opts) {
            var recurse = opts.recurse || false;
            if (recurse) {
                var view = this.getView();
                return view.__iamalloy ? view.getViewEx({
                    recurse: true
                }) : view;
            }
            return this.getView();
        },
        createStyle: function(opts) {
            return Alloy.createStyle(getControllerParam(), opts);
        },
        UI: {
            create: function(apiName, opts) {
                return Alloy.UI.create(getControllerParam(), apiName, opts);
            }
        },
        addClass: function(proxy, classes, opts) {
            return Alloy.addClass(getControllerParam(), proxy, classes, opts);
        },
        removeClass: function(proxy, classes, opts) {
            return Alloy.removeClass(getControllerParam(), proxy, classes, opts);
        },
        resetClass: function(proxy, classes, opts) {
            return Alloy.resetClass(getControllerParam(), proxy, classes, opts);
        }
    });
};

module.exports = Controller;