document.addEventListener('DOMContentLoaded', function() {
  const mapOptions = { center: [34.0709, -118.444], zoom: 5 };
  const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGn8ewFetrxNbqswSdNVk_h7uzCM4EBHNwsC2bUm7xNXAtibMAJU6kOAVlFuBXv7ZcE7YTq5rHEp4d/pub?output=csv";

  const Positive = L.featureGroup();
  const Negative = L.featureGroup();
  const Neutral = L.featureGroup();
  const layers = {
    "Positive Responses": Positive,
    "Negative Responses": Negative,
    "Neutral Responses": Neutral
  };

  const circleOptions = {
    radius: 10,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
  const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  const spaceForButtons = document.getElementById('placeForButtons');

  tileLayer.addTo(map);
  L.control.layers(null, layers).addTo(map);

  function addMarker(data) {
    let fillColor;
    let experienceType;

    if (data['Feelings?'] == "Yes") {
      fillColor = "#68ba6c";
      experienceType = "Positive";
    } else if (data['Feelings?'] == "Strong Yes") {
      fillColor = "#0d7312"; // Darker green color for strong positive response
      experienceType = "Positive";
    } else if (data['Feelings?'] == "No") {
      fillColor = "#e63535";
      experienceType = "Negative";
    } else if (data['Feelings?'] == "Strong No") {
      fillColor = "#520404"; // Darker red color for strong negative response
      experienceType = "Negative";
    } else if (data['Feelings?'] == "Neutral") {
      fillColor = "grey";
      experienceType = "Neutral";
    }

    circleOptions.fillColor = fillColor;
    const marker = L.circleMarker([data.lat, data.lng], circleOptions).bindPopup(
      `<h1>${data.name}</h1><h2>${data['Feelings?'].startsWith('Strong') ? 'Especially ' : ''}${experienceType} Experience</h2><p>${data.comment}</p><p>${data.date}</p>`
    );

    if (experienceType === "Positive") {
      Positive.addLayer(marker);
    } else if (experienceType === "Negative") {
      Negative.addLayer(marker);
    } else if (experienceType === "Neutral") {
      Neutral.addLayer(marker);
    }

    createButton(data.lat, data.lng, data.name);
  }

  function createButton(lat, lng, name) {
    const buttonId = "button" + name;
    if (document.getElementById(buttonId)) {
      return; // Skip creating the button if it already exists
    }

    const button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = name;
    button.setAttribute("lat", lat);
    button.setAttribute("lng", lng);
    button.addEventListener('click', function() {
      map.flyTo([lat, lng]);
    });

    spaceForButtons.appendChild(button);
  }

  function loadData(url) {
    Papa.parse(url, {
      header: true,
      download: true,
      complete: function(results) {
        processData(results);
      }
    });
  }

  function processData(results) {
    results.data.forEach(function(item) {
      addMarker({
        lat: parseFloat(item['lat']),
        lng: parseFloat(item['lng']),
        name: item['Name?'],
        date: item['Date?'],
        comment: item['Comments?'],
        'Feelings?': item['Feelings?']
      });

      createButton(parseFloat(item['lat']), parseFloat(item['lng']), item['Name?']);
    });

    map.addLayer(Positive);
    map.addLayer(Negative);
    map.addLayer(Neutral);

    const allLayers = L.featureGroup([Positive, Negative, Neutral]);
    map.fitBounds(allLayers.getBounds());
  }

  loadData(dataUrl);
});
