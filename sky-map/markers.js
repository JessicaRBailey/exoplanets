let aladin;
A.init.then(() => {
  aladin = A.aladin('#aladin-lite-div', {
    fov: 200, 
    projection: "STG", 
    cooFrame: 'equatorial', 
    showCooGridControl: true, 
    showSimbadPointerControl: true, 
    showCooGrid: false,
    target: 'M 20'
  });

  // Create a layer to hold markers for the solar system objects
  let solarSystemLayer = A.catalog({name: 'Solar System', color: '#FFFAFA'});

  // Add markers for the solar system objects
  let sunMarker = A.marker(286.13, 63.87, {popupTitle: 'Sun', size: 2});
  let mercuryMarker = A.marker(281.01, -23.44, {popupTitle: 'Mercury', size: 2});
  let venusMarker = A.marker(272.76, -22.69, {popupTitle: 'Venus', size: 2});
  let earthMarker = A.marker(270.00, 0.00, {popupTitle: 'Earth', size: 2});
  let marsMarker = A.marker(317.68, 1.78, {popupTitle: 'Mars', size: 2});
  let jupiterMarker = A.marker(268.05, -22.60, {popupTitle: 'Jupiter', size: 2});
  let saturnMarker = A.marker(290.12, -20.99, {popupTitle: 'Saturn', size: 2});
  let uranusMarker = A.marker(2.57, 15.87, {popupTitle: 'Uranus', size: 2});
  let neptuneMarker = A.marker(326.03, -8.74, {popupTitle: 'Neptune', size: 2});
  let plutoMarker = A.marker(210.05, -17.38, {popupTitle: 'Pluto', size: 2});

  solarSystemLayer.addSources([sunMarker, mercuryMarker, venusMarker, earthMarker, marsMarker, jupiterMarker, saturnMarker, uranusMarker, neptuneMarker, plutoMarker]);

  // Add the solar system layer to the Aladin Lite map
  aladin.addCatalog(solarSystemLayer);

  // Create a layer to hold markers for Exoplanets
  let markerLayer = A.catalog({color: 'magenta', visible: false, name: 'Exoplanets'});

  // Load JSON data using fetch
  fetch('exoplanet_data.json')
    .then(response => response.json())
    .then(data => {
      // Add markers to the marker layer
      data.forEach(exoplanet => {
        let ra = exoplanet.ra;
        let dec = exoplanet.dec;
        let name = exoplanet.pl_name;
        let description = `Discovery Year: ${exoplanet.disc_year}<br>`;
        description += `Mass (Earth mass): ${exoplanet.pl_bmasse}<br>`;
        description += `Radius (Earth radius): ${exoplanet.pl_rade}<br>`;

        let marker = A.marker(ra, dec, { 
          popupTitle: name, 
          popupDesc: description,
          size: 2
         });
        markerLayer.addSources(marker);
      });

      // Add the marker layer to the Aladin Lite map
      aladin.addCatalog(markerLayer);

    })
    .catch(error => console.error(error));
});