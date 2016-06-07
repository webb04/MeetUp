var attending = [];

function geoFindMe() {
  var output = document.getElementById("out");
  var latitude, longitude;

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

  function getStreetAddressForEvent(latitude, longitude) {
    fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=52.2944758,-1.5249530999999998&sensor=true').then(function(response){
      return response.json()
    }).then(function(j){
      document.getElementById("location").value = j.results[0].formatted_address;
    });
  }

  getStreetAddressForEvent(latitude, longitude);
}

function addAttendee() {
  attending.push(document.getElementById("attending").value);
  document.getElementById("attendees").innerHTML += "<li>" + document.getElementById("attending").value + "</li>";
  document.getElementById("attending").value = "";
}

function clearForm() {
  document.getElementById("attendees").innerHTML = "";
  attending = [];
}

function clearAllForm() {
  document.getElementById("name").value = "";
  document.getElementById("host").value = "";
  document.getElementById("location").value = "";
  document.getElementById("typeofevent").value = "";
  document.getElementById("start-fc").value = "";
  document.getElementById("end-fc").value = "";
  document.getElementById("optionalmessage").value = "";
  document.getElementById("attendees").innerHTML = "";
  attending = [];
}

function createNewEvent() {
  if (document.getElementById("name").value == "" || document.getElementById("host").value == "" || document.getElementById("typeofevent").value == "" || document.getElementById("start-fc").value == "" || document.getElementById("end-fc").value == "" || document.getElementById("location").value == "") return
  document.getElementById('main').innerHTML += '<div class="event">\
  <h4 class="event-name">'+ document.getElementById("name").value +'</h4>\
  <div style="position: relative"><img src="/img/udacity.png" style="width: 100%"/><p class="event-host">'+ document.getElementById("host").value +' @ ' + document.getElementById("location").value + '</p>\
  </div>\
  <br/><br/><br/><p class="event-type">'+ document.getElementById("typeofevent").value +'</p>\
  <div class="date-wrapper"><p class="start-date">'+ document.getElementById("start-fc").value +'</p><span></span>to<span></span><p class="end-date">'+ document.getElementById("end-fc").value +'</p></div>\
  <p class="attending">Attending: </p>\
  <p>'+ attending +'</p>\
  <p class="optionalmessage">Additional Information: </p>\
  <p>'+ document.getElementById("optionalmessage").value +'</p></div>';
  clearAllForm();
}
