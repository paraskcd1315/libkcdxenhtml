/*
Inspired by Junesiphone's createDOM.js
Script by Paras Khanchandani https://twitter.com/ParasKCD

#Requirements: -
 - None
#Usage: -
 - To Create HTML Element
 domMaker.init({
     type: ,//Enter the type of element you want to create
     src: ,//For image tags
     className: ,//For Element's class
     id: ,//For Element's id
     innerHTML: ,//For adding html data inside element
     attribute: ,//For custom Attributes
 })
 - To Append multiple items to an HTML Element
 domMaker.domAppender({
     div: //Element where to add items,
     children: []
 })
*/

var domMaker = {
    element: "",
    domAppender: function(params) {
        for(let i = 0; i < params.children.length; i++) {
            params.div.appendChild(params.children[i]);
        }
    },
    init: function(params) {
        this.element = document.createElement(params.type);
        if(params.id) {
            this.element.id = params.id;
        }
        if(params.src) {
            this.element.src = params.src;
        }
        if(params.className) {
            this.element.className = params.className;
        }
        if(params.innerHTML) {
            this.element.innerHTML = params.innerHTML;
        }
        if(params.attribute) {
            this.element.setAttribute(params.attribute[0], params.attribute[1]);
        }
        if(params.attribute2) {
            this.element.setAttribute(params.attribute2[0], params.attribute2[1]);
        }
        return this.element;
    }
}