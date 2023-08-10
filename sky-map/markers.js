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

  // Create layer to hold markers for scientist approved
  let scientistApproved = A.catalog({name: 'Scientist Approved Earthlike Planets'});

  // Add markers
  let markera = A.marker(11.248632, -15.2741085, {popupTitle: 'LHS 1140 b', size: 2, color: '#FF0000'});
  let markerb = A.marker(259.7510609, -34.9977651, {popupTitle: 'GJ 667 C c', size: 2, color: '#FF0000'});
  let markerc = A.marker(97.0957165, -65.5786149, {popupTitle: 'TOI-700 e', size: 2, color: '#FF0000'});

  scientistApproved.addSources([markera, markerb, markerc])

  aladin.addCatalog(scientistApproved);

  // Create a layer to hold markers for the solar system objects
  let earthlikeLayer = A.catalog({name: 'Earthlike Planets'});

  // Add markers for the earthlike planets objects
  let markerd = A.marker(217.3934657, -62.6761821, {popupTitle: 'Proxima Cen b', size: 2, color: 'blue'});
  let markere = A.marker(346.6263919, -5.0434618, {popupTitle: 'TRAPPIST-1e', size: 2, color: 'blue'});
  let markerf = A.marker(346.6263919, -5.0434618, {popupTitle: 'TRAPPIST-1g', size: 2, color: 'blue'});
  let markerg = A.marker(346.6263919, -5.0434618, {popupTitle: 'TRAPPIST-1f', size: 2, color: 'blue'});
  let markerh = A.marker(296.003752, 44.2775861, {popupTitle: 'Kepler-452 b', size: 2, color: 'blue'});
  let markeri = A.marker(298.652736, 43.9549884, {popupTitle: 'Kepler-186 f', size: 2, color: 'blue'});
  let markerj = A.marker(176.9376036, 0.7992898, {popupTitle: 'Ross 128 b', size: 2, color: 'blue'});
  let markerk = A.marker(259.7510609, -34.9977651, {popupTitle: 'GJ 667 C c', size: 2, color: 'blue'});

  earthlikeLayer.addSources([markerd, markere, markerf, markerg, markerh, markeri, markerj, markerk]);

  // Add the solar system layer to the Aladin Lite map
  aladin.addCatalog(earthlikeLayer);

  // Create a layer to hold markers for Exoplanets
  let markerLayer = A.catalog({color: 'magenta', visible: false, name: 'Exoplanets'});

  // Load JSON data using fetch
  fetch('../exoplanet_data.json')
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