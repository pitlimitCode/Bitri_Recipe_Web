const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/commentsControllers");

Router.get("/comments/all", controller.showAll); // SHOW ALL COMMENTS PUBLIC
Router.get("/comments/new", controller.showNew); // SHOW NEWEST COMMENTS AND LIMIT IT
Router.post("/comments/add", verifyToken.checkToken, controller.newComment); // ADD NEW COMMENT
Router.patch("/comments/edit", verifyToken.checkToken, controller.editComment); // EDIT A COMMENT BY ID
Router.delete("/comments/delete", verifyToken.checkToken, controller.deleteComment); // DELETE A COMMENT BY ID

module.exports = Router;