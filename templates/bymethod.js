document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data
    fetch('exoplanet_data.json')
      .then(response => response.json())
      .then(data => {
        // Count how many for each method
        const methods = {};
        const total = data.length;
  
        data.forEach(entry => {
          const method = entry.discoverymethod;
          if (method) {
            methods[method] = (methods[method] || 0) + 1;
          }
        });
  
        // Calculate percentages and generate caption text
        let captionText = "";
        Object.entries(methods).forEach(([method, count]) => {
          const percentage = (count / total) * 100;
          captionText += `${method}: ${count} (${percentage.toFixed(2)}%)\n`;
        });
  
        // Set the caption text
        const output = document.getElementById('caption');
        output.textContent = captionText;
      })
      .catch(error => {
        console.error('Error fetching or processing data:', error);
      });
  });