document.oncopy = iconWasCopied;

var recents = ['', '', '', '', '', '', '',
			   '', '', '', '', '', '', '',
			   '', '', '', '', '', '', ''];
getRecentsFromCookie();
refreshRecentSection();

setUpPageIndicators();

var options = {
	continuous: false
};

window.peopleSwipe = Swipe(document.getElementById('people-section'), {
	continuous: false,
	callback: function(index, elem) {
		for (var i=1; i<=9; i++) {
			var name = 'people-ind-' + i;
			if (i == index+1) {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.3)';
			} else {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.1)';
			}
		}
	}
});

window.natureSwipe = Swipe(document.getElementById('nature-section'), {
	continuous: false,
	callback: function(index, elem) {
		for (var i=1; i<=6; i++) {
			var name = 'nature-ind-' + i;
			if (i == index+1) {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.3)';
			} else {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.1)';
			}
		}
	}
});

window.objectsSwipe = Swipe(document.getElementById('objects-section'), {
	continuous: false,
	callback: function(index, elem) {
		for (var i=1; i<=11; i++) {
			var name = 'objects-ind-' + i;
			if (i == index+1) {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.3)';
			} else {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.1)';
			}
		}
	}
});

window.placesSwipe = Swipe(document.getElementById('places-section'), {
	continuous: false,
	callback: function(index, elem) {
		for (var i=1; i<=5; i++) {
			var name = 'places-ind-' + i;
			if (i == index+1) {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.3)';
			} else {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.1)';
			}
		}
	}
});

window.symbolsSwipe = Swipe(document.getElementById('symbols-section'), {
	continuous: false,
	callback: function(index, elem) {
		for (var i=1; i<=10; i++) {
			var name = 'symbols-ind-' + i;
			if (i == index+1) {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.3)';
			} else {
				document.getElementById(name).style.backgroundColor = 'rgba(0,0,0,0.1)';
			}
		}
	}
});

function iconWasCopied() {
	var copied = window.getSelection().toString();
	for (var i=0; i<copied.length; i+=2) {
		addToRecents(copied.substring(i, i+2));
	}
	createCookieFromRecents();
}

function refreshRecentSection() {
	var recentCount = 0;
	document.getElementById('recents-1').innerHTML = '';
	for (var i=0; i<21; i++) {
		var sym = recents[i];
		if (sym.length > 0) {
			var line = '<div class="item">' + sym + '</div>';
			var html = document.getElementById('recents-1').innerHTML;
			html += '\n' + line;
			document.getElementById('recents-1').innerHTML = html;
			recentCount += 1;
		}
	}
	if (recentCount == 0) {
		document.getElementById('recents-1').innerHTML = '<p id="no-recents">This section will automatically collect your most recently used icons.</p>';
	}
}

function addToRecents(sym) {
	var current = -1;
	for (var i=0; i<21; i++) {
		var s = recents[i];
		if (s.indexOf(sym) >= 0) {
			current = i;
		}
	}
	
	var start;
	if (current > -1) {
		start = current-1;
	} else {
		start = 19;
	}
	var justDeleted = false;
	for (var j=start; j>=0; j--) {
		if (current > -1 && j == current) {
			recents[j+1] = recents[j-1];
			justDeleted = true;
		} else {
			if (justDeleted) {
				justDeleted = false;
			} else {
				recents[j+1] = recents[j];
			}
		}
	}
	
	recents[0] = sym;
	
	refreshRecentSection();
}

function getRecentsFromCookie() {
	var cookie = document.cookie;
	var arr = cookie.split(";");
	for (var i=0; i<arr.length; i++) {
		var str = arr[i].trim();
		if (str.indexOf('recents') == 0) {
			var recentString = str.substring(8, str.length);
			var arr = recentString.split('~');
			for (var j=0; j<21; j++) {
				recents[j] = unescape(arr[j]);
			}
		}
	}
}

function createCookieFromRecents() {
	var cookie = "";
	var d = new Date();
	d.setTime(d.getTime()+(7*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	cookie += "recents=";
	for (var i=0; i<21; i++) {
		cookie += escape(recents[i]) + "~";
	}
	cookie = cookie.substring(0, cookie.length-1);
	cookie += "; " + expires
	document.cookie = cookie;
}

function setUpPageIndicators() {
	document.getElementById('people-ind-1').style.backgroundColor = 'rgba(0,0,0,0.3)';
	document.getElementById('nature-ind-1').style.backgroundColor = 'rgba(0,0,0,0.3)';
	document.getElementById('objects-ind-1').style.backgroundColor = 'rgba(0,0,0,0.3)';
	document.getElementById('places-ind-1').style.backgroundColor = 'rgba(0,0,0,0.3)';
	document.getElementById('symbols-ind-1').style.backgroundColor = 'rgba(0,0,0,0.3)';
}
