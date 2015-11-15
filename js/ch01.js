function onReady() {
	var clock = new Clock('clock');
	var clock = new Clock('clock2', -300, 'ETC');
	var clock = new Clock('clock3', 300, 'X');
}


function Clock(id, offset, label) {
	offset = offset || 0;
	label = label || '';
	var d = new Date();
	this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
	this.id = id;
	this.label = label;
	var that = this;
	setInterval(function() {
		that.updateClock();}, 1000);
		this.updateClock();
}

	Clock.prototype.updateClock = function() {
		var date = new Date();
		var date = new Date(this.offset + date.getTime());
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