// chart-script.js
// Fetch the JSON data
fetch('exoplanet_data.json')
  .then(response => response.json())
  .then(data => {
    // Prepare data for the chart
    var methodsData = {};
    var uniqueMethods = [...new Set(data.map(item => item.discoverymethod))];
    uniqueMethods.forEach(method => {
      methodsData[method] = {};
      data.filter(item => item.discoverymethod === method).forEach(item => {
        if (!methodsData[method][item.disc_year]) {
          methodsData[method][item.disc_year] = 0;
        }
        methodsData[method][item.disc_year] += 1;
      });
    });
    var years = Object.keys(data.reduce((acc, item) => {
      acc[item.disc_year] = true;
      return acc;
    }, {}));
    var datasets = uniqueMethods.map((method, index) => {
      var methodCounts = years.map(year => methodsData[method][year] || 0);
      return {
        label: method,
        data: methodCounts,
        backgroundColor: 'rgba(' + (index * 50) + ', 120, 200, 0.8)', // Generate colors
        borderWidth: 1
      };
    });
    // Get the canvas element for the bar chart
    var barCtx = document.getElementById('barChart').getContext('2d');
    // Create the bar chart
    var barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            title: {
              display: true,
              text: 'Number of Exoplanets Discovered'
            }
          },
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Years'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom' // Position of the legend
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching or processing data:', error);
  });