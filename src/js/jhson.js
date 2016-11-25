var WAE = {
    UTIL: {}
};
WAE.UTIL.ELEMENT = function () {

    "user strict";

    var SELF = this
    STATE_METHOD = "edit",
    this.ce = function (config) {
        if ((typeof config) === "string") {
            return $(document.createElement(config));
        } else if (config !== null && typeof config === 'object') {
            var element;
            if (!config.tag) { config.tag = "div"; }
            element = $(document.createElement(config.tag));

            if (config.value) {
                element.val(config.value);
            }
            if (config.html) {
                element.html(config.html);
            }
            if (config.attributes) {
                for (var attr in config.attributes) {
                    element.attr(attr, config.attributes[attr]);
                }
            }
            if (config.class) {
                element.addClass(config.class);
            }
            if (config.events) {
                element.prop('events', config.events);
            }
            if (config.properties) {
                element.prop('properties', config.properties);
            }
            if (config.identifier) {
                element.attr('data-identifier', config.identifier);
            }
            if (config.children) {
                config.children.forEach(function (child) {
                    element.append(SELF.ce(child));
                });
            }
            return element;
        }
    };


    this.update = function (config) {
        var foundObj = findOnAt(config.on, config.target);
        var newObj = $.extend(foundObj, config.set);
        $("[data-identifier='" + config.on + "']").replaceWith(SELF.ce(newObj));
    }
    function findOnAt(on, at) {
        var targ;
        if(at.identifier) {
            if(at.identifier === on) {
                targ = at;
            } else {
                for(var i in at.children){
                    return findOnAt(on, at.children[i]);
                }
            }
        } else {
            for(var i in at.children){
                targ = findOnAt(on, at.children[i]);
                if(targ){
                    break;
                }
            }
        }
        return targ;
    }
    return this;
};
var jhson = new WAE.UTIL.ELEMENT();