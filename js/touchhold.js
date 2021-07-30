/*
inspired by Junesiphone's taphold.js
Script by Paras Khanchandani https://twitter.com/ParasKCD

#Usage:-
touchhold.init({
    time: //enter the amount of wait
    element: //enter the dom element, to add event on,
    callback: (event) => //do something
});
*/

var touchhold = {
	elements: {},
	tapTimer: null,
	clearTimer: function () {
		if (this.tapTimer) {
			clearTimeout(this.tapTimer);
		}
	},
	touchStarted: function (event) {
		this.clearTimer;
		let elementInfo = touchhold.elements[event.target.id];
		if (!elementInfo) {
			elementInfo = touchhold.elements[event.target.parentElement.id];
			if (!elementInfo) {
				elementInfo =
					touchhold.elements[event.target.parentElement.parentElement.id];
			}
		}
		this.tapTimer = setTimeout(function () {
			elementInfo.callback(event.target, event);
		}, elementInfo.time);
	},
	addEvents: function (element) {
		eventHandler.addEvent(element, {
			event: 'touchstart',
			callback: this.touchStarted,
			label: 'touchHolderStart'
		});
		eventHandler.addEvent(element, {
			event: 'touchmove',
			callback: this.clearTimer,
			label: 'touchHolderMove'
		});
		eventHandler.addEvent(element, {
			event: 'touchend',
			callback: this.clearTimer,
			label: 'touchHolderEnd'
		});
		eventHandler.addEvent(element, {
			event: 'touchcancel',
			callback: this.clearTimer,
			label: 'touchHolderCancel'
		});
	},
	init: function (params) {
		setTimeout(() => {
			let elementID = params.element.id;
			touchhold.elements[elementID] = {};
			touchhold.elements[elementID].time = params.time;
			touchhold.elements[elementID].callback = params.callback;
			touchhold.elements[elementID].element = params.element;
			touchhold.addEvents(params.element);
		}, 0);
	}
};
