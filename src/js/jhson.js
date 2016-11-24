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
            if (config.children) {
                config.children.forEach(function (child) {
                    element.append(SELF.ce(child));
                });
            }
            return element;
        }
    };

    return this.ce;
};
var jhson = new WAE.UTIL.ELEMENT();