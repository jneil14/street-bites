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


router.delete("/:id", (req, res) => {
  // console.log(req.params.id)
  let found = favorites.find(favorite => favorite.identifier === req.params.id);
  if (found) {
    let deleteTruck = favorites.filter(
      favorite => favorite.identifier !== req.params.id
    );
    
    helper.writeJSONFile(favoritesFile, deleteTruck);
        res.json({
          msg: `Food truck with identifier: ${req.params.id}, has been deleted`,
          favorites: deleteTruck
        });
      } else {
        res
          .status(404)
          .json({ errorMessage: `Food truck with identifier: ${req.params.id}, has not been found` });
      }
})

// router.delete("/:id", function(req, res) {
//   var id = req.params.id;
//   let removed = favorites.slice(id, id+1) 
//   console.log(removed)
// });



// router.delete("/:id", (req, res) => {
//   const found = books.some(book => book.id === req.params.id);
//   if (found) {
//     const booksAfterDeletion = books.filter(book => book.id !== req.params.id);
//     helper.writeJSONFile(booksFile, booksAfterDeletion);
//     res.json({
//       msg: `Book with ID: ${req.params.id} Deleted`,
//       books: booksAfterDeletion
//     });
//   } else {
//     res
//       .status(404)
//       .json({ errorMessage: `Book with ID: ${req.params.id} not found` });
//   }
// });


module.exports = router;