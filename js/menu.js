/*
Script by Paras Khanchandani https://twitter.com/ParasKCD
#Requirements:-
 - domMaker.js
 - menu.css
#Usage:-
menu.init({
    id: "id",
    message: "message",
    menuItems: [
        {
            id: "something",
            title: "something",
            callback: function() {
                console.log("something");
            }
        },
        {
            id: "something2",
            title: "something2",
            callback: function() {
                console.log("something2");
            }
        },
        {
            id: "something3",
            title: "something3",
            callback: function() {
                console.log("something3");
            }
        },
        {
            id: "something4",
            title: "something4",
            callback: function() {
                console.log("something4");
            }
        },
        {
            id: "something5",
            title: "something5",
            callback: function() {
                console.log("something5");
            }
        }
    ]
})
*/

var menu = {
    menu: "",
    params: {},
    menuItems: [],
    eventArray: [],
    movedWhilePressing: false,
    makeEventListener: function(params) {
        this.eventArray.push({
            button: params.button,
            eventType: params.eventType,
            callback: params.callback
        });
        params.button.addEventListener(params.eventType, params.callback);
        params.button.addEventListener('touchmove', () => this.movedWhilePressing = true);
    },
    addEvents: function(params) {
        this.makeEventListener({
            button: params.button,
            eventType: params.eventType,
            callback: function() {
                if(!menu.movedWhilePressing) {
                    menu.closeMenu();
                    params.callback();
                }
                menu.movedWhilePressing = false;
            }
        });
    },
    closeMenu: function() {
        this.removeEvents();
        this.menu.classList.add("closed");
        setTimeout(() => {
            document.body.removeChild(menu.menu);
            menu.menu = null;
        }, 350);
    },
    removeEvents: function() {
        for(let i = 0; i < this.eventArray.length; i++) {
            let event = menu.eventArray[i];
            event.button.removeEventListener(event.eventType, event.callback);
            event.button.removeEventListener('touchmove', () => this.movedWhilePressing = true);
        }
    },
    menuMaker: function() {
        let mainDiv = domMaker.init({
                type: "div",
                id: this.params.id,
                className: "menuWindow closed"
            }),
            menuHeader = domMaker.init({
                type: "div",
                className: "menuHeader",
                innerHTML: this.params.message
            });
        mainDiv.appendChild(menuHeader);
        for(let i = 0; i < this.menuItems.length; i++) {
            let menuItem = domMaker.init({
                type: "div",
                id: this.menuItems[i].id,
                className: "menuButton",
                innerHTML: this.menuItems[i].title
            });
            this.addEvents({
                button: menuItem,
                eventType: 'touchend',
                callback: this.menuItems[i].callback
            });
            mainDiv.appendChild(menuItem);
        }
        return mainDiv;
    },
    init: function(params) {
        this.params = params;
        this.menuItems = params.menuItems;
        this.menu = this.menuMaker();
        document.body.appendChild(this.menu);
        setTimeout(() => menu.menu.classList.remove("closed"), 350);
    }
}