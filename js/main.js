(function() {
	var register = document.getElementById('new-event-wrapper');
	register.style.display = 'none';
	var el = document.getElementById('new-event');
	el.addEventListener('click', openEventWindow, false);
	var events = [
			{'name': 'Mikes 30th',
			'type': 'Birthday',
			'host': 'Udacity',
			'startdate': 'Monday',
			'enddate': 'Tuesday',
			'guestlist': ['Tom', 'Jess', 'Jamie'],
			'location': 'Udacity HQ',
			'optionalmessage': 'Plus ones allowed'},
			{'name': 'Jens 30th',
			'type': 'Birthday',
			'host': 'Udacity',
			'startdate': 'Monday',
			'enddate': 'Tuesday',
			'guestlist': ['Tom', 'Jess', 'Jamie'],
			'location': 'Udacity HQ',
			'optionalmessage': 'Plus ones allowed'},
			{'name': 'Allens 30th',
			'type': 'Birthday',
			'host': 'Udacity',
			'startdate': 'Monday',
			'enddate': 'Tuesday',
			'guestlist': ['Tom', 'Jess', 'Jamie'],
			'location': 'Udacity HQ',
			'optionalmessage': 'Plus ones allowed'}
	];

	for (event in events) {
		document.getElementById('main').innerHTML += '<div class="event">\
		<h4 class="event-name">'+ events[event].name +'</h4>\
		<div style="position: relative"><img src="/img/udacity.png" style="width: 100%"/><p class="event-host">'+ events[event].host +' @ ' + events[event].location + '</p>\
		</div>\
		<br/><br/><br/><p class="event-type">'+ events[event].type +'</p>\
		<div class="date-wrapper"><p class="start-date">'+ events[event].startdate +'</p><span></span>to<span></span><p class="end-date">'+ events[event].enddate +'</p></div>\
		<p class="attending">Attending: </p>\
		<p>'+ events[event].guestlist +'</p>\
		<p class="optionalmessage">Additional Information: </p>\
		<p>'+ events[event].optionalmessage +'</p></div>';
	}

})();

function openEventWindow() {
	var el = document.getElementById('new-event-wrapper');
	el.style.display = el.style.display === 'none' ? '' : 'none';
}
