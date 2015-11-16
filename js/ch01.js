function onReady() {
	var clock = new Clock('clock');
	var clock = new Clock('clock2', -300, 'ETC');
	var clock = new Clock('clock3', 300, 'X');
}

Date.__interval = 0;
Date.__aDates = [];

Date.addToInterval = function(date) {
	this.__aDates.push(date);
	if(!Date.__interval)
		Date.__interval = setInterval(function() {Date.updateDates();}, 1000);
}
Date.updateDates = function() {
	for(var i=0; i<this.__aDates.length; i++) {
		this.__aDates[i].updateSeconds();
	}
}

Date.prototype.updateSeconds = function() {
	this.setSeconds(this.getSeconds() + 1)
}

Date.prototype.autoClock = function(isAuto) {
	if(isAuto) {
		Date.addToInterval(this);
	}
}

function Clock(id, offset, label) {
	offset = offset || 0;
	label = label || '';
	var d = new Date();
	var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
	this.d = new Date(offset + d.getTime());
	this.d.autoClock(true);
	this.id = id;
	this.label = label;
	var that = this;
	setInterval(function() {
		that.updateClock();}, 1000);
	this.updateClock();
}

Clock.prototype.version = '1.00';

Clock.prototype.updateClock = function() {
	var date = this.d;
	var clock = document.getElementById(this.id)
	clock.innerHTML = this.formatDigits(date.getHours()) + ':' + this.formatDigits(date.getMinutes()) + ':' + this.formatDigits(date.getSeconds()) + ' ' + this.label;
};

Clock.prototype.formatDigits = function(val) {
	if (val < 10) {
		val =  '0' + val;
	}
	return val;
}

window.onload = onReady;