 function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 59.334591, lng: 18.063240 },
          zoom: 13,
        });
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);
        // Specify just the place data fields that you need.
        autocomplete.setFields(["place_id", "geometry", "name", "opening_hours/weekday_text", "formatted_address"]);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        const marker = new google.maps.Marker({ map: map });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
        autocomplete.addListener("place_changed", () => {
          infowindow.close();
          const place = autocomplete.getPlace();

          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location,
          });
          marker.setVisible(true);
          infowindowContent.children.namedItem("place-name").textContent =
            place.name;
          infowindowContent.children.namedItem("place-id").textContent =
            place.place_id;
          infowindowContent.children.namedItem("place-address").textContent =
            place.formatted_address;
          infowindow.open(map, marker);
        });
      }
      function createPhotoMarker(place) {
  var photos = place.photos;
  if (!photos) {
    return;
  }

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    icon: photos[0].getUrl({maxWidth: 35, maxHeight: 35})
  });
}