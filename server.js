// const express = require("express");
// const app = express();
// const MongoClient = require("mongodb").MongoClient;

// const url = "mongodb://localhost:27017/ExoplanetDB";
// const dbName = "ExoplanetDB";

// app.use(express.static("public"));

// app.get("/getMetrics", async (req, res) => {
//   try {
//     const client = new MongoClient(url);
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("exoplanet_counts");

//     const metricsData = await collection.findOne({});
//     client.close();

//     res.json(metricsData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
