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
    res.status(400).send(err);
    // res.status(400).send("Something wrong while progress all comment data.");
  }
};

// SHOW NEWEST COMMENTS AND LIMIT IT
const showNew = async (req, res) => {
  try {
    const { id_recipe, limit } = req.query;
    const show = await model.showNew(id_recipe, limit);
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
  const id_commenter = req.tokenUserId;
  const { id_recipe, comment_text } = req.body;
  try {
    const show = await model.newComment(id_recipe, id_commenter, comment_text);
    res.status(200).send(`Your comment succesfully to be added.`);
  } catch (err) {
    res.status(400).send("Something wrong while adding new comment.");
  }
}

// EDIT A COMMENT BY ID
const editComment = async (req, res) => {
  const id_commenter = req.tokenUserId;
  const { id, comment_text } = req.body;
  if (id == null || comment_text == null) {
    res.status(400).send("Please input id and/or your comment");
  } else {
    try {
      const show = await model.selectById(id);
      if (show.rows[0].id_commenter == id_commenter) {
        try {
          const show2 = await model.editComment(id, id_commenter, comment_text);
          res.status(200).send(`Comment has been edited.`);  
        } catch (err) {
          res.status(400).send("Something wrong while editing comment.");
        }
      } else {
        res.status(400).send("You cann't edit other user comment.");
      }
    } catch (err) {
      res.status(400).send("Something wrong in data input for editing comment.");
    }
  }
} 

// DELETE A COMMENT BY COMMENTS.ID
const deleteComment = async (req, res) => {
  const id_commenter = req.tokenUserId;
  const { id } = req.body;
  if (id) {
    let inpId = id;
    try {
      const show = await model.selectById(id);
      if (show.rowCount > 0) {
        if (show.rows[0].id_commenter == id_commenter) {
          try {
            const show2 = await model.deleteComment(id, id_commenter);
            res.status(200).send(`Your comment id: '${inpId}' succesfully to be deleted.`);
          } catch (err) { 
            res.status(400).send(`Id data: catch, not found`);
          }
          
        } else {
          res.status(400).send("You cann't delete other user recipe.");
        }
      } else {
        res.status(400).send(`No one Comment id: '${id}' on Database.`);
      }
    } catch (err) {
      res.status(400).send("Something wrong while deleting data by id");
    }
  } else {
    res.status(400).send("Please input Id comment");
  }
}

module.exports = { showAll, showNew, newComment, editComment, deleteComment };