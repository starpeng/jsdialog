//util
    //解决弹出窗口，框架显示问题
    var doc = document;
    
    if (!Array.prototype.push) {
        Array.prototype.push = function() {
            var startLength = this.length;
            for (var i = 0; i < arguments.length; i++) this[startLength + i] = arguments[i];
            return this.length
        }
    };

    function G() {
        var elements = new Array();
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            if (typeof element == 'string') element = doc.getElementById(element);
            if (arguments.length == 1) return element;
            elements.push(element);
        };
        return elements
    };

    Function.prototype.bind = function(object) {
        var __method = this;
        return function() {
            __method.apply(object, arguments);
        }
    };
    
    Function.prototype.bindAsEventListener = function(object) {
        var __method = this;
        return function(event) {
            __method.call(object, event || window.event)
        }
    };
    
    Object.extend = function(destination, source) {
        for (property in source) {

            destination[property] = source[property]
        };
        return destination
    };

    var isIE6 = !(navigator.userAgent.toLowerCase().indexOf("opera") > -1) && ((document.all) ? true : false) && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);


    //修正firefox问题
    // !window.Event ===>!Event
    if (!Event) {
        var Event = new Object()
    };
    
    Object.extend(Event,{
    observers: false, element: function(event) {
        return event.target || event.srcElement
    }, 
    
    isLeftClick: function(event) {
	    return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)))
    }, 
    
    pointerX: function(event) {
	    return event.pageX || (event.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft))
    }, 
    
    pointerY: function(event) {
	    return event.pageY || (event.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop))
    }, 
    
    stop: function(event) {
	    if (event.preventDefault) {
		    event.preventDefault();
		    event.stopPropagation()
    }
    else {
        event.returnValue = false;
        event.cancelBubble = true
    }
}, 

findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase()))) element = element.parentNode;
    return element
}, 

_observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
        this.observers.push([element, name, observer, useCapture]);
        element.addEventListener(name, observer, useCapture)
    }
    else if (element.attachEvent) {
        this.observers.push([element, name, observer, useCapture]);
        element.attachEvent('on' + name, observer)
    }
}, 

unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0; i < Event.observers.length; i++) {
        Event.stopObserving.apply(this, Event.observers[i]);
        Event.observers[i][0] = null
    };
    Event.observers = false
}, 

observe: function(element, name, observer, useCapture) {
    var element = G(element);
    useCapture = useCapture || false;
    if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) name = 'keydown';
    this._observeAndCache(element, name, observer, useCapture)
}, 

stopObserving: function(element, name, observer, useCapture) {
    var element = G(element);
    useCapture = useCapture || false;
    if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent)) name = 'keydown';
    if (element.removeEventListener) {
        element.removeEventListener(name, observer, useCapture)
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + name, observer)
    }
}
});

Event.observe(window, 'unload', Event.unloadCache, false);

var Class = function() {
        var _class = function() {
            this.initialize.apply(this, arguments)
        };
        for (i = 0; i < arguments.length; i++) {
            superClass = arguments[i];
            for (member in superClass.prototype) {
                _class.prototype[member] = superClass.prototype[member]
            }
        };
        _class.child = function() {
            return new Class(this)
        };
        _class.extend = function(f) {
            for (property in f) {
                _class.prototype[property] = f[property]
            }
        };
        return _class
};

function space(flag) {
        if (flag == "begin") {
            var ele = doc.getElementById("ft");
            if (typeof (ele) != "undefined" && ele != null) ele.id = "ft_popup";
            ele = doc.getElementById("usrbar");
            if (typeof (ele) != "undefined" && ele != null) ele.id = "usrbar_popup"
        }
        else if (flag == "end") {
            var ele = doc.getElementById("ft_popup");
            if (typeof (ele) != "undefined" && ele != null) ele.id = "ft";
            ele = doc.getElementById("usrbar_popup");
            if (typeof (ele) != "undefined" && ele != null) ele.id = "usrbar"
        }
};