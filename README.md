# Exoplanets
### An analysis of exoplanets that are like Earth. 

Exoplanets are planets that are outside of our solar system.  The first exoplanet was confirmed in 1992 and today we are discovering new exoplanets every day.  We find them using many different observational techniques, including microlensing and by transit across their star.  NASA and space agencies around the world are collecting data on every exoplanet they find, but the most interesting ones are those that are Earth-like, in their star’s Goldilock’s (or habitable) Zone, and nearby.  
For this project, we used data generously shared by NASA Exoplanet Archive's Table Access Protocol to explore the exoplanets found to date.  Visitors can explore information about exoplanets that share similarities with earth, such as size, mass, and that they are in their star’s Goldilock’s (or habitable) Zone.  

On our page you will find: 
### Exoplanet Counts
Three metrics showing the number of exoplanets confirmed, the number unconfirmed, or candidates, and the number of Planetary systems that contain exoplanets.  These flexboxes hold data originating from a mongo databased that was populated using webscraped data from this NASA webpage:  https://exoplanets.nasa.gov/.  View how the database was populated in exoplanet_count_db.ipynb.  
### Discovery Methods
There are multiple ways astronomers have to discover exoplanets.  The most common way is to observe them transiting their host star.  Large space telescopes such as Kepler, TESS, and now the James Webb Space Telescope record regular dips in the brightness of a star that indicate the planet is passing in between the host star and Earth, blocking light.  This chart was created using data from NASAs Exoplanet Archive's Table Access Protocol API at: https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars&format=json and was interpreted with help from a csv file provided to explain key meanings (https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html).  This chart is animated using Chart.js.  Visitors can select and deselect transit methods to explore all discovery types.  

![image](https://github.com/JessicaRBailey/exoplanets/assets/131318832/867bde5e-79c9-4515-a3f4-b9daa17ccb86)

### Distance from Host Star
Some planets, called rogue planets, do not have host stars, but most of the confirmed exoplanets are orbiting a star.  In this chart outliers have been removed.  The remaining data shows how far a star is from its host star in AU (astronomical units, 1 AU = the distance from Earth to our Sun) and is broken out by the year the exoplanet was discovered.  The source for this data is the same as the discovery methods, and Chart.js was also used to display these data.  

![image](https://github.com/JessicaRBailey/exoplanets/assets/131318832/5c9d56bb-43b9-4465-ace6-bad4661109d9)


### Star Map
Exoplanets in the same database from NASA were plotted on a space map ().  Layers are provided so that visitors may view the locations of exoplanets that are like Earth in radius, mass, density, and temperature (Goldilock’s Zone).  

![image](https://github.com/JessicaRBailey/exoplanets/assets/131318832/a06cf59c-a147-4a5a-9f1b-482e9ce22745)

### The Tech Stack
To compile our page, we used Flask API, webscraping, MongoDB, HTML & CSS, and JavaScript, including a JavaScript library that was not covered in class: Charts.js. 

### Special Thanks and Attributions
Data and libraries for this project come from the following sources
* Nasa Jet Propulsion Laboratory, California Institute of Technology (https://exoplanetarchive.ipac.caltech.edu/docs/API_queries.html)
* Chart.js (https://www.chartjs.org/)
* Space Map (https://github.com/cds-astro/aladin-lite)
* Thank you to our teacher, teaching assistants, and tutors at UC Berkeley Extension, and to ChatGPT for invaluable help putting this together!

Contributors:  Yun Kim, Devanshi Mathur, Judy Xia, Jessica Bailey, Andrew Brannon

