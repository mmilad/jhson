var WAE_JHSON_CONFIG = function () {

    "user strict";

    var SELF = this,
        MODEL_OBJECT;
    
    this.init = function (config){
        SELF.setModel(config);
        document.body.appendChild(SELF.ce(MODEL_OBJECT));
    };

    this.ce = function (config) {
        config = configToElement(config);
        
        config.element.jhson = config
        config.ae = function (addConfig){
            config.children.push(addConfig);
            config.element.appendChild(SELF.ce(addConfig));
        };
        config.find = function (identifier){
            var arg = SELF.find(this, identifier);
            return arg;
        };
        config.findInParent = function (identifier){
            var parent = this.element.parentNode.jhson;
            var arg = SELF.find(parent, identifier);
            return arg;
        };
        config.get = function (identifier){
            return this[identifier];
        };

        config.update = function (addConfig){
            addConfig = SELF.ce(addConfig);
            var oldElement = this.element;
            var newConfig = merge(this, addConfig.jhson);
            addConfig = SELF.ce(newConfig).jhson;
            oldElement.parentNode.replaceChild(SELF.ce(newConfig), oldElement);
            return this;
        };
        if (config.config) {
            if(config.config.widget){
                if(config.config.widget_config){
                    // config.element[config.config.widget](config.config.widget_config);
                } else {
                    // config.element[config.config.widget]();
                }
            }
        } else {
            config.config = {};
        }
        if (config.value) {
            config.element.value = config.value;
        }
        if (config.html) {
            config.element.innerHTML = config.html;
        }
        if (config.attributes) {
            for (var attr in config.attributes) {
                config.element.setAttribute(attr, config.attributes[attr]);
            }
        }
        if (config.class) {
            if(config.element.className !== ""){config.class = " "+config.class;}
            config.element.className += config.class;
        }
        if (config.events) {
            for(var i in config.events){
                    config.element.addEventListener(config.events[i].event, config.events[i].callback);
            }
        }
        if (config.properties) {
            config.properties = config.properties;
        }
        if (config.id) {
            config.element.setAttribute('data-identifier', config.id);
        }
        if (config.children) {
            config.children.forEach(function (child) {
                config.element.appendChild(SELF.ce(child));
            });
        } else {
            config.children = [];
        }
            return config.element;
    };
    this.setModel = function(obj){
        MODEL_OBJECT = obj;
    };

    this.getModel = function(){
        return MODEL_OBJECT;
    };
    
    this.update = function (config) {
        if(!config.on){config.on = MODEL_OBJECT;}
        var foundObj = SELF.find(config.on, config.id);
        var newObj = merge(foundObj, config.set);
        if(newObj.element){
            newObj.element.replaceWith(SELF.ce(newObj));
        }
    };
    
    this.find = function (on, identifier) {
        var targ;
        if(on.id === identifier) {
            targ = on;
        } else {
            for(var i in on.children){
                targ = SELF.find(on.children[i], identifier);
                if(targ !== undefined){
                    break;
                }
            }
        }        
        return targ;
    };
    function merge(objA, objB){
        for(var i in objB){
            objA[i] = objB[i];
        }
        return objA;
    }

    function configToElement(config){
        if(!config.jhson){
            if ((typeof config) === "string") {
                config.element = document.createElement(config);
            } else if (typeof config === 'object') {
                if(config.nodeName){
                    var isElement = config;
                    config = {
                        tag: isElement.nodeName.toLowerCase(),
                        element: isElement
                    };
                    if(isElement.value !== ""){
                        config.value = isElement.value;
                    }
                    if(isElement.childNodes.length !== 0){
                        config.children = [];
                        isElement.childNodes.forEach(function(child){
                            config.children.push(SELF.ce(child));
                        });
                    }
                } else {
                    if (!config.tag) { config.tag = "div"; }
                    config.element = document.createElement(config.tag);
                }
            } else if(config === undefined){
                config = {
                    tag: 'div',
                    element: document.createElement('div')
                }
            }
        } else {
            config = config.jhson;
        }
        return config;
    }
    return this;
};
var jhson = new WAE_JHSON_CONFIG();