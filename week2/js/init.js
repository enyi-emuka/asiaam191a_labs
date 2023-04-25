 console.log("hi enyi")

 // JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); 

// Leaflet tile layer, i.e. the base map
let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
let albertwork = L.marker([34.0709, -118.444]).addTo(map) 
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where Albert works in ')
        .openPopup();
let busstop = L.marker([34.0738, -118.4382]).addTo(map)
        .bindPopup('My bus stop for commuting<br> I ride on the u4')
        .openPopup();
function addMarker(lat,lng,message){ 
            console.log(message) 
            L.marker([lat,lng]).addTo(map).bindPopup(message) 
            return message 
        }
//using the function, setting the parameters
addMarker(37.1466,-121.6341,'My Highschool!')
addMarker(37.2911, -121.9495, 'My First Place of Employment: <br> Kumon Learning Center')
addMarker(37.7649, -122.1660, 'I went to a gaming conference: Genesis 6 here. <br> I watched Splatoon mostly!')
addMarker(5.7837, 7.0429, 'My Fathers Village')

function openWeek(event, weekNumber) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(weekNumber).style.display = "block";
    event.currentTarget.className += " active";
  }
         