const express = require('express');
const app = express();
require("dotenv").config();

console.log(process.env);


// const featuredRoute = require("./routes/api/featured");
// app.use("/api/featured", featuredRoute)

// const nearbyRoute = require("./routes/api/nearby");
// app.use("/api/nearby", nearbyRoute)

// const newRoute = require("./routes/api/new");
// app.use("/api/nearby", newRoute)




app.listen(5000, console.log("Server is running on port: 5000"));