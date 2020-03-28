const express = require("express");
const router = express.Router();
const favoritesFile = __dirname + "/../../models/favorites.json";
const favorites = require(favoritesFile);
const helper = require("../../helper/helper");


router.get("/", (req, res) => {
    res.json(favorites)
})


router.post("/", (req, res) => {
  const newIdentifier = {
    identifier: req.body.identifier
  }
  let found = favorites.find(favorite => favorite.identifier === req.body.identifier)
  if(!found) {
      favorites.push(newIdentifier);
      helper.writeJSONFile(favoritesFile, favorites);
      res.json(favorites);
  }
  else {
      res.json(false);
  }
})


module.exports = router;