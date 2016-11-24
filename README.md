# Synopsis
simple project to create jquery obj from json 
# Code Example
#### var obj = {
    tag: "div",                        // describes the tag name
    attributes: {                      // object with attributes and values
        id: "my_id",                   // set attributes.id
        class: "my_class1 my_class2",  // set attributes.class
        style: "width: 10px;",         // set attributes.style
        data-custom: "foobar"          // set etc...
    },
    class: "custom_class",             // add a class
    html: "my html text",              // appends text before first child element
    value: "my value text",            // set value
    children: [
        {
            tag: "span",               // first child tag name
            html: "my_span",            // first child html
        },
        {
            tag: "input",               // second child tag name
            value: "my_input",          // second child value
        }
    ],
    properties: {                       // sets $(element).prop('properties', object)
        foo: "bar",                     // sets $(element).prop('properties.foo', 'bar')
        bar: "foo"                      // sets $(element).prop('properties.bar', 'foo')
    }
#### }
# Motivation

for usages like
- create templates
- easier jquery element creation


# Usage
// after jquery
<script src="render.js"></script>

ce(obj); // will create an jquery element of our json obj