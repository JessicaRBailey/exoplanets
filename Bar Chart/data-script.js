// Fetch the CSV data
fetch('exoplanet_data.csv')
  .then(response => response.text())
  .then(csv => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');

    // Find the indices of 'Discovery Year' and 'Discovery Method' columns
    const discoveryYearIndex = headers.indexOf('Discovery Year');
    const discoveryMethodIndex = headers.indexOf('Discovery Method');

    // Display data rows
    const dataBody = document.getElementById('dataBody');
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row = document.createElement('tr');

      const discoveryYear = values[discoveryYearIndex];
      const discoveryMethod = values[discoveryMethodIndex];

      const tdYear = document.createElement('td');
      tdYear.textContent = discoveryYear;
      row.appendChild(tdYear);

      const tdMethod = document.createElement('td');
      tdMethod.textContent = discoveryMethod;
      row.appendChild(tdMethod);

      dataBody.appendChild(row);
    }
  })
  .catch(error => {
    console.error('Error fetching CSV data:', error);
  });
