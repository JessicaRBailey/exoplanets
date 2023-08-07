let aladin;
A.init.then(() => {
  aladin = A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov: 1.5, target: 'M 20' });

  $('input[name=survey]').change(function() {
    aladin.setImageSurvey($(this).val());
  });

  // Create a layer to hold markers
  let markerLayer = A.catalog({color: '#800080'})

  //Add Markers from JSON data using d3.json
  let path = "exoplanet_data.json";
  d3.json(path).then(function(response) {
    if (!response) {
      console.error('Failed to plot exoplanets');
      return;
    }
  // Store markers in array
    //let markers = []

    response.forEach(exoplanet => {
      let ra = exoplanet.ra;
      let dec = exoplanet.dec;
      let name = exoplanet.pl_name;
      let description = `Discovery Year: ${exoplanet.disc_year}<br>`;
      description += `Mass (Jupiter mass): ${exoplanet.pl_bmassj}<br>`;
      description += `Radius (Jupiter radius): ${exoplanet.pl_radj}<br>`;

      let marker = A.marker(ra, dec, { popupTitle: name, popupDesc: description });
      markers.push(marker);
    });

    // Add markers from the array to the markerLayer
    markerLayer.addSources(markers); 


    // Add the marker layer to the Aladin Lite map
    markerLayer.addTo(aladin);
  });

});

