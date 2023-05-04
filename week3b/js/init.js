console.log("hi enyi")

// JavaScript const variable declaration
// declare the variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// declare the map and use the variables above
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
let albertwork = L.marker([34.0709, -118.444]).addTo(map) 
       .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where Albert works in ')
       .openPopup();
let busstop = L.marker([34.0738, -118.4382]).addTo(map)
       .bindPopup('My bus stop for commuting<br> I ride on the u4')
       .openPopup();
function addMarker(lat,lng,title,message){
        console.log(message)
        L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
        createButtons(lat,lng,title); 
        return message
    }
    function createButtons(lat,lng,title){
      const newButton = document.createElement("button"); // adds a new button
      newButton.id = "button"+title; // gives the button a unique id
      newButton.innerHTML = title; // gives the button a title
      newButton.setAttribute("lat",lat); // sets the latitude 
      newButton.setAttribute("lng",lng); // sets the longitude 
      newButton.addEventListener('click', function(){
          map.flyTo([lat,lng]); //this is the flyTo from Leaflet
      })
      document.getElementById("contents").appendChild(newButton); //this adds the button to our page.
    }
fetch("map.geojson")
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(data =>{
        // the leaflet method for adding a geojson
        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => { 
                return L.circleMarker(latlng, {color: feature.properties.color}); 
            }
            // ... other code here

    
        })
.bindPopup(layer => {
    console.log(layer.feature.properties.place)
    return "You clicked on " + layer.feature.properties.place;
}).addTo(map);

        // do something with the data
    })   


//using the function, setting the parameters
addMarker(37.1466,-121.6341, 'Live Oak Highschool', 'I graduated in a pandemic in 2020')
addMarker(37.2911, -121.9495, 'Kumon Learning Center', 'My First Place of Employment')
addMarker(37.7649, -122.1660, 'Genesis 6', 'I went to a gaming conference here. <br> I watched Splatoon mostly!')
addMarker(5.7837, 7.0429, 'Imo State, Nigeria','My Fathers Village he was born here in 1962')

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

// i want to open the page with the listing directory? will this work ater it get published?
function Open() {
  window.open("http://127.0.0.1:5500", "_blank");
}

let myString = "hi, this is a test string"
let divideBySpace = myString.split(" ")
console.log(divideBySpace) 
// the period after the variable acticates the method which can do things
let myStringg = "hi, this is a test string"
let divideBySpaces = myStringg.toUpperCase().split("")
console.log(divideBySpaces)


