function onReady() {
	var clock = new com.website.AlarmClock('clock');
	var clock = new com.website.TextClock('clock2', -300, 'ETC');
	var clock = new com.website.Clock('clock3', 300, 'X');

	LiveDate.call(clock, 1,2,3);
	LiveDate.apply(clock, [1,2,3]);
}

function LiveDate(a,b,c) {
	console.log(this, a, b, c)
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

var com = com || {};
com.website = com.website || {};

com.website.Clock = function(id, offset, label) {
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

com.website.Clock.prototype.version = '1.00';

com.website.Clock.prototype.updateClock = function() {
	var date = this.d;
	var clock = document.getElementById(this.id)
	clock.innerHTML = this.formatOutput(date.getHours(), date.getMinutes(), date.getSeconds(), this.label);
};

com.website.Clock.prototype.formatOutput = function(h,m,s,label) {
	return this.formatDigits(h) + ':' + this.formatDigits(m) + ':' + this.formatDigits(s) + ' ' + label;
}

com.website.Clock.prototype.formatDigits = function(val) {
	if (val < 10) {
		val =  '0' + val;
	}
	return val;
}

com.website.TextClock = function(id, offset, label) {
	com.website.Clock.apply(this, arguments)
	console.log(this.version);
}
com.website.TextClock.prototype = createObject(com.website.Clock.prototype, com.website.TextClock);
com.website.TextClock.prototype.version = '1.01';
com.website.TextClock.prototype.formatOutput = function(h,m,s,label) {
	return this.formatDigits(h) + '-' + this.formatDigits(m) + '-' + this.formatDigits(s) + ' ' + label;
}

com.website.AlarmClock = function(id, offset, label, almH, almM) {
	com.website.Clock.apply(this, arguments)
	this.almH = almH;
	this.almM = almM;
	console.log(this.version);
	this.dom = document.getElementById(id);
	this.dom.contentEditable = true;
}
com.website.AlarmClock.prototype = createObject(com.website.Clock.prototype, com.website.AlarmClock);
com.website.AlarmClock.prototype.formatOutput = function(h,m,s,label) {
	var output;
	if (h == this.almH && m == this.almM) {
		output = 'ALARM - WAKE UP'
		var snd = new Audio('')
	}
	else
		output = com.website.Clock.prototype.formatOutput.apply(this, arguments);
	return output;
}


function createObject(proto, cons) {
	function c() {}
	c.prototype = proto;
	c.prototype.constructor = cons;
	return new c();
}



window.onload = onReady;