var WAE = {
    UTIL: {}
};
WAE.UTIL.ELEMENT = function () {

    "user strict";

    var SELF = this,
        MODEL_OBJECT,
        STATE_METHOD = "edit";
    
    this.init = function (config){
        SELF.setModel(config);
        SELF.create();
    };

    this.ce = function (config) {
        if ((typeof config) === "string") {
            return $(document.createElement(config));
        } else if (config !== null && typeof config === 'object') {
            var element;
            if (!config.tag) { config.tag = "div"; }
            element = $(document.createElement(config.tag));
            config.element = element;
            if (config.config) {
                if(config.config.widget){
                    if(config.config.widget_config){
                        element[config.config.widget](config.config.widget_config);
                    } else {
                        element[config.config.widget]();
                    }
                }
            }
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
                for(var i in config.events){
                    if(config.events[i].target){
                        element.on(config.events[i].event, config.events[i].target, config.events[i].callback);
                    } else {
                        element.on(config.events[i].event, config.events[i].callback);
                    }
                }
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
    this.create = function (){
        $('body').append(SELF.ce(MODEL_OBJECT));
    }
    this.setModel = function(obj){
        MODEL_OBJECT = obj;
    };

    this.getModel = function(){
        return MODEL_OBJECT;
    };
    
    this.update = function (config) {
        if(!config.on){config.on = MODEL_OBJECT;}
        var foundObj = findOnAt(config.on, config.identifier);
        var newObj = $.extend(foundObj, config.set);
        if(newObj.element){
            newObj.element.replaceWith(SELF.ce(newObj));
        }
    };
    
    function findOnAt(on, identifier) {
        var targ;
        if(on.identifier) {
            if(on.identifier === identifier) {
                targ = on;
            } else {
                for(var i in on.children){
                    return findOnAt(on.children[i], identifier);
                }
            }
        } else {
            for(var i in on.children){
                targ = findOnAt(on.children[i], identifier);
                if(targ){
                    break;
                }
            }
        }
        return targ;
    };

    return this;
};
var jhson = new WAE.UTIL.ELEMENT();