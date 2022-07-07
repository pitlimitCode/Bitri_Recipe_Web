const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/recipesControllers");
const multiUpload = require("../middleware/multiUploadVideo");
const singleUploadRecipe = require("../middleware/singleUploadRecipe");

Router.get("/recipes/show/all", controller.showAll); // SHOW ALL RECIPES
Router.get("/recipes/pagination/", controller.showInPages); // SHOW RECIPES IN PAGES
Router.get("/recipes/show/new", controller.showNew); // SHOW 5 NEW RECIPES
Router.get("/recipes/show/id", controller.showById); // FIND RECIPE BY ID
Router.get("/recipes/show/name", controller.showByName); // FIND RECIPE BY NAME
Router.post("/recipes/add", verifyToken.checkToken, controller.newRecipe); // ADD NEW RECIPE
Router.post("/recipes/addvideo", verifyToken.checkToken, multiUpload.array('video', 4), controller.newVideo); // ADD VIDEO TO RECIPE
Router.patch("/recipes/editimage", verifyToken.checkToken, singleUploadRecipe.single('image'), controller.editImage); // EDIT RECIPE DATA BY ID
Router.patch("/recipes/edit", verifyToken.checkToken, controller.editRecipe); // EDIT RECIPE DATA BY ID
Router.delete("/recipes/delete", verifyToken.checkToken, controller.deleteRecipe); // DELETE RECIPE BY ID

module.exports = Router;