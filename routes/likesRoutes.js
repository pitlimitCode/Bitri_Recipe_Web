const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/likesControllers");

Router.get("/likes/all", controller.showAll); // SHOW ALL LIKES PUBLIC
Router.post("/likes/add", verifyToken.checkToken, controller.newLike); // ADD NEW LIKE COMMENT
Router.delete("/likes/delete", verifyToken.checkToken, controller.deleteLike); // DELETE A LIKE BY ID

module.exports = Router;