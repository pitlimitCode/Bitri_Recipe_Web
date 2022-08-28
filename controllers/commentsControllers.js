const model = require("../model/commentsModel");

// SHOW ALL COMMENTS PUBLIC
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one Comment record in this apps.");
    }
  } catch (err) {
    // res.status(400).send(err);
    res.status(400).send("Something wrong while progress all comment data.");
  }
};

// SHOW NEWEST COMMENTS
const showNew = async (req, res) => {
  try {
    const { id_recipe } = req.query;
    const show = await model.showNew(id_recipe);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one comments history.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting comments of a recipe.");
  }
};

// ADD NEW COMMENT
const newComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id_recipe, comment_text } = req.body;
    const show = await model.newComment(id_recipe, id_commenter, comment_text);
    res.status(200).send(`Your comment succesfully to be added.`);
  } catch (err) {
    res.status(400).send("Something wrong while adding new comment.");
  }
}

// EDIT A COMMENT BY ID
const editComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id, comment_text } = req.body;
    if (id == null || comment_text == null) { return res.status(400).send("Please input id and/or your comment"); }
    
    const show = await model.selectById(id);
    if (show.rows[0].id_commenter !== id_commenter) { return res.status(400).send("You cann't edit other user comment."); }
    
    await model.editComment(id, id_commenter, comment_text);
    return res.status(200).send(`Comment has been edited.`);  

  } catch (err) {
    res.status(400).send("Something wrong in data input for editing comment.");
  }
} 

// DELETE A COMMENT BY COMMENTS.ID
const deleteComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id } = req.body;
    if (id == '') { return res.status(400).send("Please input Id comment"); }

    let inpId = id;
    const show = await model.selectById(id);
    if (show.rowCount == 0) { return res.status(400).send(`No one Comment Id: '${id}' on Database.`); }
    if (show.rows[0].id_commenter !== id_commenter) { return res.status(400).send("You cann't delete other user recipe."); }
      
    const show2 = await model.deleteComment(id, id_commenter);
    return res.status(200).send(`Your comment id: '${inpId}' succesfully to be deleted.`);
      
  } catch (err) {
    res.status(400).send("Something wrong while deleting data by id");
  }
}

module.exports = { showAll, showNew, newComment, editComment, deleteComment };