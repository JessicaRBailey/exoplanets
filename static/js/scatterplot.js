document.addEventListener('DOMContentLoaded', function() {
  let outliersCount; 

  // Fetch the data
  fetch('/getjson')
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

      // Get the quartiles and IQR
      const values = chartData.map(exoplanet => exoplanet.y);
      const sortedValues = values.slice().sort((a, b) => a - b);
      const q1 = sortedValues[Math.floor(sortedValues.length * 0.25)];
      const q3 = sortedValues[Math.floor(sortedValues.length * 0.75)];
      const iqr = q3 - q1;

      // Get the lower and upper bounds for outliers
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;

      // Filter out the outliers
      const filteredData = chartData.filter(exoplanet => exoplanet.y >= lowerBound && exoplanet.y <= upperBound);

      // Count the number of outliers
      outliersCount = chartData.length - filteredData.length;

      // Create H

      // Create the scatter plot chart
      const scatterCtx = document.getElementById('scatterChart').getContext('2d');
      const scatterChart = new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Exoplanet Distances From Host Stars',
            data: filteredData,
            pointBackgroundColor: filteredData.map(exoplanet => getColorByDistance(exoplanet.y)),
            pointRadius: filteredData.map(exoplanet => getBubbleSize(exoplanet.y)),
            pointHoverRadius: 0 // Set hover radius to 0 to disable hover effect
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
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false // Disable tooltips
            },
            legend: {
              display: true,
              labels: {
                generateLabels: function (chart) {
                  const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                  labels.push({
                    text: `Outliers: ${outliersCount}`,
                    fillStyle: 'rgba(201, 203, 207, 0.8)',
                    strokeStyle: 'rgba(201, 203, 207, 0.8)',
                    lineWidth: 1,
                    hidden: false
                  });
                  return labels;
                },
              }
            }
          },
        }
      });

      // Function to get the color based on the count
      function getColorByDistance(distance) {
        let distanceCategories = [
          { maxDistance: 0.2, color: 'rgba(255, 99, 132, 0.8)' }, // Red
          { maxDistance: 0.4, color: 'rgba(255, 159, 64, 0.8)' }, // Orange
          { maxDistance: 0.6, color: 'rgba(255, 205, 86, 0.8)' }, // Yellow
          { maxDistance: 0.8, color: 'rgba(75, 192, 192, 0.8)' }, // Light blue
          { maxDistance: 1, color: 'rgba(54, 162, 235, 0.8)' } // Blue
        ];

        for (var i = 0; i < distanceCategories.length; i++) {
          if (distance <= distanceCategories[i].maxDistance) {
            return distanceCategories[i].color;
          }
        }

        return 'rgba(201, 203, 207, 0.8)'; // Gray for unknown distances
      }

      // Calculate bubble size based on distance
      function getBubbleSize(distance) {
        return 10 - distance;
      }
    })
    .catch(error => {
      console.error('Error fetching exoplanet data:', error);
    });
});