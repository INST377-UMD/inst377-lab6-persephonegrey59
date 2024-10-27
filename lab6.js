/*
P. Grey Moran
INST377 - Lab 6

Lab 6 JavaScript
*/


document.addEventListener('DOMContentLoaded', function () {

    var map = L.map('map').setView([37, -100], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    async function addMarkers() {
        var coordinates = document.getElementById('coordinates');

        for (let i = 0; i < 3; i++) {

            var latitude = getRandomInRange(30,35,3);
            var longitude = getRandomInRange(-90,-100,3);

            var marker = L.marker([latitude, longitude]).addTo(map);

            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                var locality = data.locality;
                var coordinate = document.createElement('div');
                coordinate.innerHTML = `Marker ${i + 1}: Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${locality}`;
                coordinates.appendChild(coordinate);
            
            })
            
        }

    }

    addMarkers();

})