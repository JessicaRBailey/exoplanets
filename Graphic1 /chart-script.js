// chart-script.js

// Sample data for exoplanet discovery methods
var discoveryMethodsData = [
  { method: 'Radial Velocity', count: 1200 },
  { method: 'Transit', count: 980 },
  { method: 'Microlensing', count: 450 },
  { method: 'Direct Imaging', count: 300 },
  { method: 'Astrometry', count: 200 },
  { method: 'Pulsar Timing', count: 150 },
  { method: 'Orbital Brightness Modulation', count: 130 },
  { method: 'Transit Timing Variations', count: 100 },
  { method: 'Eclipse Timing Variations', count: 80 },
  { method: 'Pulsation Timing Variations', count: 70 }
];

// Extract method names and counts for the chart
var methodNames = discoveryMethodsData.map(data => data.method);
var methodCounts = discoveryMethodsData.map(data => data.count);

// Get the canvas element for the bar chart
var barCtx = document.getElementById('barChart').getContext('2d');

// Create the bar chart
var barChart = new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: methodNames,
    datasets: [{
      data: methodCounts,
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',  // Red
        'rgba(54, 162, 235, 0.8)', // Blue
        'rgba(255, 205, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Light blue
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)', // Orange
        'rgba(201, 203, 207, 0.8)', // Gray
        'rgba(99, 255, 132, 0.8)', // Green
        'rgba(235, 162, 54, 0.8)', // Orange
        'rgba(86, 205, 255, 0.8)'  // Light blue
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(99, 255, 132, 1)',
        'rgba(235, 162, 54, 1)',
        'rgba(86, 205, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    animation: {
      duration: 2000, // Animation duration in milliseconds
      easing: 'easeInOutExpo' // Easing function for animation
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Exoplanets Discovered'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Discovery Methods'
        }
      }
    }
  }
});