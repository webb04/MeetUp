var attending = [];
var latitude, longitude;
var el = document.getElementById('loader');
el.style.display = 'none';
var el = document.getElementById('attending');
el.style.border = 'solid 1px #F56060';

function geoFindMe() {
  var el = document.getElementById('loader');
  el.style.display = '';
  var output = document.getElementById('out');

  if (!navigator.geolocation){
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  output.innerHTML = '<p>Locating…</p>';
  navigator.geolocation.getCurrentPosition(success, error);
}

function getStreetAddressForEvent(latitude, longitude) {
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    document.getElementById('location').value = j.results[0].formatted_address;
  });
}

function success(position) {
  latitude  = position.coords.latitude;
  longitude = position.coords.longitude;

  // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  //
  // var img = new Image();
  // img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=300x300&sensor=false';
  //
  // output.appendChild(img);
  getStreetAddressForEvent(latitude, longitude);
  var el = document.getElementById('loader');
  el.style.display = 'none';
}

function error() {
  output.innerHTML = 'Unable to retrieve your location';
}

function addAttendee() {
  var attendee = document.getElementById('attending').value;

  if (attendee != '') {
    attending.push(attendee);
    document.getElementById('attendees').innerHTML += '<li>' + document.getElementById('attending').value + '</li>';
    document.getElementById('attending').value = '';

    var el = document.getElementById('attending');
    el.style.border = 'solid 1px #04D487';

    var el = document.getElementById("new-event-wrapper");
    var height = el.offsetHeight;
    var newHeight = height - 80;
    el.style.height = newHeight + 'px';
  }
}

function clearForm() {
  document.getElementById('attendees').innerHTML = '';
  attending = [];
  var el = document.getElementById('attending');
  el.style.border = 'solid 1px #F56060';

  var el = document.getElementById("new-event-wrapper");
  el.style.height = '1000px';
}

function clearAllForm() {
  document.getElementById('name').value = '';
  document.getElementById('host').value = '';
  document.getElementById('location').value = '';
  document.getElementById('typeofevent').value = '';
  document.getElementById('start-fc').value = '';
  document.getElementById('end-fc').value = '';
  document.getElementById('optionalmessage').value = '';
  document.getElementById('attendees').innerHTML = '';
  attending = [];
}

function validateEventDates() {
  var endDate = new Date(document.getElementById('end-fc').value).valueOf();
  var startDate = new Date(document.getElementById('start-fc').value).valueOf();
  var today = new Date();
  var valid = true;

  if (endDate < startDate) {
      document.getElementById('dateordererror').innerHTML = "End date should not be before start date";
      var el = document.getElementById('end-fc');
      el.style.border = 'solid 1px #F56060';
      valid = false;
  } else {
      document.getElementById('dateordererror').innerHTML = "";
      if (!isNaN(endDate)) {
        var el = document.getElementById('end-fc');
        el.style.border = 'solid 1px #04D487';
      }
  }

  if (startDate < today) {
      document.getElementById('startdateerror').innerHTML = "Start date should not be in the past";
      var el = document.getElementById('start-fc');
      el.style.border = 'solid 1px #F56060';
      valid = false;
  } else {
      document.getElementById('startdateerror').innerHTML = "";
      var el = document.getElementById('start-fc');
      el.style.border = 'solid 1px #04D487';
  }

  if (valid) {
    return true;
  } else {
    return false;
  }
}

function createNewEvent() {
  if (!validateEventDates()) return;
  if (attending.length == 0) return;
  if (document.getElementById('name').value == '' || document.getElementById('host').value == '' || document.getElementById('typeofevent').value == '' || document.getElementById('start-fc').value == '' || document.getElementById('end-fc').value == '' || document.getElementById('location').value == '') return;

  document.getElementById('main').innerHTML += '<div class="event">\
  <h4 class="event-name">'+ document.getElementById('name').value +'</h4>\
  <div style="position: relative"><img src="/img/udacity.png" style="width: 100%"/><p class="event-host">'+ document.getElementById('host').value +' @ ' + document.getElementById('location').value + '</p>\
  </div>\
  <br/><br/><br/><p class="event-type">'+ document.getElementById('typeofevent').value +'</p>\
  <div class="date-wrapper"><p class="start-date">'+ document.getElementById('start-fc').value +'</p><span></span>to<span></span><p class="end-date">'+ document.getElementById('end-fc').value +'</p></div>\
  <p class="attending">Attending: </p>\
  <p>'+ attending +'</p>\
  <p class="optionalmessage">Additional Information: </p><p>'+ document.getElementById('optionalmessage').value +'</p></div>';
  clearAllForm();
}

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('invalid', function(e) {
        e.preventDefault();
        //Possibly implement your own here.
    }, true);
}
