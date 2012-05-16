// Figure out how to move this into impact
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

String.prototype.addCommas = function(){

	//this += '';
	var x = this.split('.'),
	x1 = x[0],
	x2 = x.length > 1 ? '.' + x[1] : '',
	rgx = /(\d+)(\d{3})/;
	
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
 	
 	return x1 + x2;
}

Number.prototype.addCommas = function(){
	// Convert to a string and add commas
	return String(this).addCommas();
}

angleTo = function( x1, y1, x2, y2 ) {
	return Math.atan2(
		(y2 - y1),
		(x2 - x1)
	);
}

//Fallback functionality for non EC5 browsers
if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [],
            k;
        for (k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                keys.push(k);
            }
        }
        return keys;
    };
}