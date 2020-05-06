const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
require("dotenv").config();

console.log(process.env);

app.use(express.json());
app.use(express.static("public"));


const favoritesRoutes = require("./routes/api/favorites");
app.use("/api/favorites", favoritesRoutes);


app.listen(5000, console.log("Server is running on port: 5000"));
