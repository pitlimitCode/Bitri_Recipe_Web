const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/usersControllers");
const singleUploadAvatar = require("../middleware/singleUploadAvatar");

Router.get("/users/show/all", controller.showAll); // SHOW ALL USERS
Router.get("/users/show/id", controller.showById); // FIND USER BY ID
Router.get("/users/getid", verifyToken.checkToken, controller.justGetId); // FIND USER BY ID
Router.get("/users/show/myrecipe", controller.showMyRecipe); // SHOW USER RECIPE
Router.get("/users/show/name", controller.showByName); // FIND USER BY NAME
Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.post("/users/login", controller.userLogin); // LOGIN
Router.patch("/users/addavatar", verifyToken.checkToken, singleUploadAvatar.single('avatar'), controller.addAvatar); // ADD USER AVATAR
Router.patch("/users/edit", verifyToken.checkToken, controller.editUserData); // EDIT USER DATA BY ID
Router.delete("/users/delete/id", verifyToken.checkToken, controller.deleteUser); // DELETE USER BY ID

module.exports = Router;