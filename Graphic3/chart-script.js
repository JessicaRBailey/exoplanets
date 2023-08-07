// chart-script.js

// Sample data (replace this with actual data fetched from the backend)
var exoplanetData = generateRandomExoplanetData(4000, 35);

// Generate random exoplanet data within specified time and distance ranges
function generateRandomExoplanetData(count, timeRange) {
  var data = [];

  for (var i = 0; i < count; i++) {
    data.push({
      year: Math.floor(Math.random() * timeRange) + 1989, // Adjusted year range
      distance: Math.floor(Math.random() * 10), // Generate whole numbers for distances
    });
  }

  return data.sort((a, b) => a.year - b.year); // Sort by oldest to most recent
}

// Get color based on distance
function getColorByDistance(distance) {
  var distanceCategories = [
    { maxDistance: 2, color: 'rgba(255, 99, 132, 0.8)' }, // Red
    { maxDistance: 4, color: 'rgba(255, 159, 64, 0.8)' }, // Orange
    { maxDistance: 6, color: 'rgba(255, 205, 86, 0.8)' }, // Yellow
    { maxDistance: 8, color: 'rgba(75, 192, 192, 0.8)' }, // Light blue
    { maxDistance: 10, color: 'rgba(54, 162, 235, 0.8)' } // Blue
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
      pointRadius: [],
      pointHoverRadius: 8
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
      scatterChart.data.datasets[0].pointBackgroundColor.push(getColorByDistance(exoplanet.distance));
      scatterChart.data.datasets[0].pointRadius.push(getBubbleSize(exoplanet.distance));
      scatterChart.update();
      dataIndex++;
    } else {
      clearInterval(animation);
    }
  }, 100); // Interval between adding data points (milliseconds)
}

// Start the scatter plot animation
startScatterPlotAnimation();
