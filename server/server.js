const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
require("dotenv").config();

console.log(process.env);

app.use(express.json());
app.use(express.static("public"));
// const featuredRoute = require("./routes/api/featured");
// app.use("/api/featured", featuredRoute)

// const nearbyRoute = require("./routes/api/nearby");
// app.use("/api/nearby", nearbyRoute)

// const favoritesRoute = require("./routes/api/favorites");
// app.use("/api/favorites", favoritesRoute)



/**
 * route: http://localhost:5000/api/favourites
 * read from a json file e.g. favourites.json to load data
 * one issue is the favourites would be the same for all users, e.g. no user accounts
 */

const favoritesRoutes = require("./routes/api/favorites");
app.use("/api/favorites", favoritesRoutes);

// post to this endpoint and write to json file
// write to the file favouritesFile
// app.post("/api/favourites", (req, res) => {
// });

app.listen(5000, console.log("Server is running on port: 5000"));
