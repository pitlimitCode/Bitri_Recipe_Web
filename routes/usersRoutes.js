const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/usersControllers");
const singleUploadAvatar = require("../middleware/singleUploadAvatar");

Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.post("/users/login", controller.userLogin); // LOGIN
Router.get("/users/getid", verifyToken.checkToken, controller.justGetId); // JUST RES.SEND ID_USER BY JWT DECODED
Router.get("/users/getall", controller.showAll); // SHOW ALL USERS
Router.get("/users/id/:id", controller.showById); // FIND USER BY ID
Router.get("/users/name/:name", controller.showByName); // FIND USER BY NAME
Router.get("/users/myrecipe", verifyToken.checkToken, controller.showMyRecipe); // SHOW USER RECIPE
Router.patch("/users/addavatar", verifyToken.checkToken, singleUploadAvatar.single('avatar'), controller.addAvatar); // ADD USER AVATAR
Router.patch("/users/edit", verifyToken.checkToken, controller.editUserData); // EDIT USER DATA BY ID
Router.delete("/users/delete/id", verifyToken.checkToken, controller.deleteUser); // DELETE USER BY ID

module.exports = Router;