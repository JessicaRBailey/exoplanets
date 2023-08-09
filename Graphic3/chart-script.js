// Define the color gradient
const colorGradient = [
  'rgba(255, 0, 255, 0.2)', // Magenta
  'rgba(255, 0, 0, 0.8)' // Red
];
// Fetch the data
fetch('exoplanet_data.json')
  .then(response => response.json())
  .then(data => {
    // Calculate the count of discoveries per year
    const countByYear = data.reduce((count, exoplanet) => {
      const year = exoplanet.disc_year;
      count[year] = (count[year] || 0) + 1;
      return count;
    }, {});
    // Extract the required data for plotting
    const chartData = data.map(exoplanet => ({
      x: exoplanet.disc_year,
      y: exoplanet.pl_orbsmax,
      count: countByYear[exoplanet.disc_year]
    }));
    // Get the canvas element for the scatter plot chart
    const scatterCtx = document.getElementById('scatterChart').getContext('2d');
    // Create the scatter plot chart
    const scatterChart = new Chart(scatterCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Exoplanet Distances',
          data: chartData,
          pointBackgroundColor: chartData.map(exoplanet => getGradientColor(exoplanet.count)),
          pointRadius: 5,
          pointHoverRadius: 8
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Year Discovered'
            },
            ticks: {
              callback: function (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '');
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Distance from Star (AU)'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = '';
                if (context.parsed.x !== null) {
                  label = 'Year: ' + context.parsed.x + '\n';
                }
                if (context.parsed.y !== null) {
                  label += 'Distance: ' + context.parsed.y + ' AU';
                }
                return label;
              }
            }
          }
        }
      }
    });
    // Function to get the gradient color based on the count
    function getGradientColor(count) {
      const gradientIndex = Math.min(count - 1, colorGradient.length - 1);
      return colorGradient[gradientIndex];
    }
  })
  .catch(error => {
    console.error('Error fetching exoplanet data:', error);
  });