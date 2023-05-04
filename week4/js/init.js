// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
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