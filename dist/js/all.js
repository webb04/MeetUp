function getWindowHeight(){return window.innerHeight}function geoFindMe(){var e=document.getElementById("loader");e.style.display="";var t=document.getElementById("out");return navigator.geolocation?(t.innerHTML="<p>Locating…</p>",void navigator.geolocation.getCurrentPosition(success,error)):void(t.innerHTML="<p>Geolocation is not supported by your browser</p>")}function getStreetAddressForEvent(e,t){var n="http://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+t+"&sensor=true";fetch(n).then(function(e){return e.json()}).then(function(e){document.getElementById("location").value=e.results[0].formatted_address})}function success(e){latitude=e.coords.latitude,longitude=e.coords.longitude,getStreetAddressForEvent(latitude,longitude);var t=document.getElementById("loader");t.style.display="none"}function error(){output.innerHTML="Unable to retrieve your location"}function addAttendee(){var e=document.getElementById("attending").value;if(""!=e){attending.push(e),document.getElementById("attendees").innerHTML+="<li>"+document.getElementById("attending").value+"</li>",document.getElementById("attending").value="";var t=document.getElementById("attending");t.style.border="solid 1px #04D487";var t=document.getElementById("new-event-wrapper"),n=t.offsetHeight,a=n-80;t.style.height=a+"px"}}function clearForm(){document.getElementById("attendees").innerHTML="",attending=[];var e=document.getElementById("attending");e.style.border="solid 1px #F56060";var e=document.getElementById("new-event-wrapper");e.style.height="1000px"}function clearAllForm(){document.getElementById("name").value="",document.getElementById("host").value="",document.getElementById("location").value="",document.getElementById("typeofevent").value="",document.getElementById("start-fc").value="",document.getElementById("end-fc").value="",document.getElementById("optionalmessage").value="",document.getElementById("attendees").innerHTML="",attending=[]}function validateEventDates(){var e=new Date(document.getElementById("end-fc").value).valueOf(),t=new Date(document.getElementById("start-fc").value).valueOf(),n=new Date,a=!0;return t>e?(document.getElementById("dateordererror").innerHTML="End date should not be before start date",a=!1):document.getElementById("dateordererror").innerHTML="",n>t?(document.getElementById("startdateerror").innerHTML="Start date should not be in the past",a=!1):document.getElementById("startdateerror").innerHTML="",!!a}function createNewEvent(){validateEventDates()&&0!=attending.length&&""!=document.getElementById("name").value&&""!=document.getElementById("host").value&&""!=document.getElementById("typeofevent").value&&""!=document.getElementById("start-fc").value&&""!=document.getElementById("end-fc").value&&""!=document.getElementById("location").value&&(document.getElementById("main").innerHTML+='<div class="event">  <h4 class="event-name">'+document.getElementById("name").value+'</h4>  <div style="position: relative"><img src="/img/udacity.png" style="width: 100%"/><p class="event-host">'+document.getElementById("host").value+" @ "+document.getElementById("location").value+'</p>  </div>  <br/><br/><br/><p class="event-type">'+document.getElementById("typeofevent").value+'</p>  <div class="date-wrapper"><p class="start-date">'+document.getElementById("start-fc").value+'</p><span></span>to<span></span><p class="end-date">'+document.getElementById("end-fc").value+'</p></div>  <p class="attending">Attending: </p>  <p>'+attending+'</p>  <p class="optionalmessage">Additional Information: </p><p>'+document.getElementById("optionalmessage").value+"</p></div>",clearAllForm())}function openEventWindow(){var e=document.getElementById("new-event-wrapper");e.style.display="none"===e.style.display?"":"none",document.forms[0].elements[0].focus()}getWindowHeight();var attending=[],latitude,longitude,el=document.getElementById("loader");el.style.display="none";var el=document.getElementById("attending");el.style.border="solid 1px #F56060";for(var forms=document.getElementsByTagName("form"),i=0;i<forms.length;i++)forms[i].addEventListener("invalid",function(e){e.preventDefault()},!0);!function(){var e=document.getElementById("new-event-wrapper");e.style.display="none";var t=document.getElementById("new-event");t.addEventListener("click",openEventWindow,!1);var n=[{name:"Mikes 30th",type:"Birthday",host:"Udacity",startdate:"Monday",enddate:"Tuesday",guestlist:["Tom","Jess","Jamie"],location:"Udacity HQ",optionalmessage:"Plus ones allowed"},{name:"Jens 30th",type:"Birthday",host:"Udacity",startdate:"Monday",enddate:"Tuesday",guestlist:["Tom","Jess","Jamie"],location:"Udacity HQ",optionalmessage:"Plus ones allowed"},{name:"Allens 30th",type:"Birthday",host:"Udacity",startdate:"Monday",enddate:"Tuesday",guestlist:["Tom","Jess","Jamie"],location:"Udacity HQ",optionalmessage:"Plus ones allowed"}];for(event in n)document.getElementById("main").innerHTML+='<div class="event">		<h4 class="event-name">'+n[event].name+'</h4>		<div style="position: relative"><img src="/img/udacity.png" style="width: 100%"/><p class="event-host">'+n[event].host+" @ "+n[event].location+'</p>		</div>		<br/><br/><br/><p class="event-type">'+n[event].type+'</p>		<div class="date-wrapper"><p class="start-date">'+n[event].startdate+'</p><span></span>to<span></span><p class="end-date">'+n[event].enddate+'</p></div>		<p class="attending">Attending: </p>		<p>'+n[event].guestlist+'</p>		<p class="optionalmessage">Additional Information: </p>		<p>'+n[event].optionalmessage+"</p></div>"}();