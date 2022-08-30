const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/likesControllers");

Router.get("/likes/all", controller.showAll); // SHOW ALL LIKES PUBLIC
Router.get("/likes/byuser", controller.showByUser); // SHOW LIKES BY ID_
Router.get("/likes/byuser", controller.showByUser); // SHOW LIKES BY ID_
Router.post("/likes/add", verifyToken.checkToken, controller.newLike); // ADD NEW LIKE COMMENT
Router.patch("/likes/edit", verifyToken.checkToken, controller.editLike); // EDIT A LIKE BY ID
Router.delete("/likes/delete", verifyToken.checkToken, controller.deleteLike); // DELETE A LIKE BY ID

module.exports = Router;