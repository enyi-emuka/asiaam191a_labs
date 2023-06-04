document.addEventListener('DOMContentLoaded', function() {
    // declare variables
    let mapOptions = {'center': [34.0709, -118.444], 'zoom': 5};
  
    // use the variables
    const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // create a function to add markers
    function addMarker(lat, lng, name, date, comment) {
      console.log(comment);
      L.marker([lat, lng]).addTo(map).bindPopup(`<h2>${name}</h2> <h3>${date}</h3> <h4>${comment}</h4>`);
      return comment;
    }
  
    function createButtons(lat, lng, name) {
      const newButton = document.createElement("button"); // adds a new button
      newButton.id = "button" + name; // gives the button a unique id
      newButton.innerHTML = name; // gives the button a title
      newButton.setAttribute("lat", lat); // sets the latitude
      newButton.setAttribute("lng", lng); // sets the longitude
      newButton.addEventListener('click', function() {
        map.flyTo([lat, lng]); // this is the flyTo from Leaflet
      });
      const spaceForButtons = document.getElementById('placeForButtons');
      spaceForButtons.appendChild(newButton); // this adds the button to our page.
    }
  
    const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGn8ewFetrxNbqswSdNVk_h7uzCM4EBHNwsC2bUm7xNXAtibMAJU6kOAVlFuBXv7ZcE7YTq5rHEp4d/pub?output=csv";
  
    function loadData(url) {
      Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
      });
    }
  
    function processData(results) {
      console.log(results);
      results.data.forEach(data => {
        console.log(data);
        addMarker(data.lat, data.lng, data['name'], data['date'], data['comment']);
        createButtons(data.lat, data.lng, data['name']); // Call createButtons function
      });
    }
  
    loadData(dataUrl);
  });
  