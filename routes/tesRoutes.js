const Router = require("express").Router();

const controller = require("../controllers/tesControllers");
Router.post("/tes/add", controller.tes);
Router.get("/tes/all", controller.showAll); // SHOW ALL COMMENTS PUBLIC
Router.get("/tes/new", controller.showNew); // SHOW NEWEST COMMENTS AND LIMIT IT
Router.patch("/tes/edit", controller.editComment); // EDIT A COMMENT BY ID
Router.delete("/tes/delete", controller.deleteComment); // DELETE A COMMENT BY ID

module.exports = Router;