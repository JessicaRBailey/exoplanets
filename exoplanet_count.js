document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch("/getMetrics");
      const data = await response.json();
  
      document.getElementById("candidates").textContent = data.Candidates;
      document.getElementById("planetarySystems").textContent = data["Planetary Systems"];
      document.getElementById("confirmedDiscoveries").textContent = data["Confirmed Discoveries"];
    } catch (error) {
      console.error("Error:", error);
    }
  });

  async function fetchData() {
    try {
      const response = await fetch("/getMetrics");
      const data = await response.json();
  
      document.getElementById("candidates").textContent = data.Candidates;
      document.getElementById("planetarySystems").textContent = data["Planetary Systems"];
      document.getElementById("confirmedDiscoveries").textContent = data["Confirmed Discoveries"];
    } catch (error) {
      console.error("Error:", error);
    }
  }