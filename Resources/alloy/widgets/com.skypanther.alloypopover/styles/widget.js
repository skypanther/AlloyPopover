function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.skypanther.alloypopover/" + s : s.substring(0, index) + "/com.skypanther.alloypopover/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0004,
    key: "popover",
    style: {
        navBarHidden: true,
        zIndex: 2,
        backgroundColor: "transparent"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "backshade",
    style: {
        backgroundColor: "#2a2a2a",
        opacity: .6,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "wrapper",
    style: {
        backgroundColor: "white",
        width: "75%",
        height: "80%",
        borderColor: "#777",
        borderWidth: 3
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "titlebar",
    style: {
        backgroundColor: "#777",
        height: 40,
        top: 0,
        width: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "title",
    style: {
        font: {
            fontSize: 16
        },
        fontWeight: "bold",
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Title",
        width: Ti.UI.SIZE,
        zIndex: 1
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "leftnavbutton",
    style: {
        backgroundColor: "#1a48a4",
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
        visible: false
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "rightnavbutton",
    style: {
        backgroundColor: "#1a48a4",
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
        visible: false
    }
}, {
    isClass: true,
    priority: 10000.0016,
    key: "contents",
    style: {
        backgroundColor: "white",
        top: 40,
        left: 2,
        right: 2,
        bottom: 2
    }
}, {
    isClass: true,
    priority: 10101.0006,
    key: "shadow",
    style: {
        backgroundColor: "#333",
        width: "75%",
        height: "80%",
        opacity: .6
    }
}, {
    isClass: true,
    priority: 10101.0008,
    key: "wrapper",
    style: {
        borderRadius: 4
    }
}, {
    isClass: true,
    priority: 10101.001,
    key: "titlebar",
    style: {
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
        }
    }
}, {
    isClass: true,
    priority: 10101.0013,
    key: "leftnavbutton",
    style: {
        backgroundColor: "transparent",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#aaa"
            }, {
                color: "#1a48a4"
            } ]
        },
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: 2
    }
}, {
    isClass: true,
    priority: 10101.0015,
    key: "rightnavbutton",
    style: {
        backgroundColor: "transparent",
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#aaa"
            }, {
                color: "#1a48a4"
            } ]
        },
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderRadius: 2
    }
}, {
    isId: true,
    priority: 100000.0001,
    key: "backshade",
    style: {
        backgroundColor: "pink"
    }
} ];