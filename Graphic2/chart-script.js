// chart-script.js

// Sample data (replace this with actual data fetched from the backend)
var exoplanetData = generateRandomExoplanetData(4000, 50);

// Generate random exoplanet data within specified time and distance ranges
function generateRandomExoplanetData(count, timeRange) {
  var data = [];

  for (var i = 0; i < count; i++) {
    data.push({
      year: Math.floor(Math.random() * timeRange) + 1970,
      distance: Math.random() * 10,
    });
  }

  return data;
}

// Get color based on explored time
function getColorByTime(year) {
  var colorIndex = Math.floor((year - 1970) / 5);
  var colors = [
    'rgba(255, 99, 132, 0.8)', // Red
    'rgba(75, 192, 192, 0.8)', // Light blue
    'rgba(255, 205, 86, 0.8)', // Yellow
    'rgba(54, 162, 235, 0.8)', // Blue
    'rgba(255, 159, 64, 0.8)', // Orange
    'rgba(153, 102, 255, 0.8)', // Purple
    'rgba(201, 203, 207, 0.8)', // Gray
  ];

  return colors[colorIndex % colors.length];
}

// Get the canvas element for the scatter plot chart
var scatterCtx = document.getElementById('scatterChart').getContext('2d');

// Create the scatter plot chart
var scatterChart = new Chart(scatterCtx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Exoplanet Distances',
      data: [],
      pointBackgroundColor: [],
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  },
  options: {
    animation: {
      duration: 1000, // Animation duration in milliseconds
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Distance from Earth (light-years)'
        }
      }
    }
  }
});

// Function to start the scatter plot animation
function startScatterPlotAnimation() {
  var dataIndex = 0;

  var animation = setInterval(function () {
    var exoplanet = exoplanetData[dataIndex];

    if (exoplanet) {
      scatterChart.data.datasets[0].data.push({ x: exoplanet.year, y: exoplanet.distance });
      scatterChart.data.datasets[0].pointBackgroundColor.push(getColorByTime(exoplanet.year));
      scatterChart.update();
      dataIndex++;
    } else {
      clearInterval(animation);
    }
  }, 100); // Interval between adding data points (milliseconds)
}

// Start the scatter plot animation
startScatterPlotAnimation();
