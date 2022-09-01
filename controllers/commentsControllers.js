const model = require("../model/commentsModel");
const recipemodel = require("../model/recipeModel");

// SHOW ALL COMMENTS PUBLIC
const showAll = async (req, res) => {
  try {
    const { sort } = req.query;
    
    // Validation input query 'sort'
    if(!req.query.sort){
      return res.json({ 
        StatusCode: 400, 
        isValid: false, 
        message: "Routes must be '/comments/all/?sort=asc' or '/comments/all/?sort=desc'" 
      });
    }
    if(sort != 'asc' && sort != 'desc' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes for '?sort=' must be 'asc' or 'desc'", });
    }

    // SQL model Select all data in column Recipes table PostgreSQL Database
    const show = await model.showAll(sort);
    
    // If no one Recipe on Database
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: "No one Comment on Database", }); }
    
    // Success show Recipe on Database
    return res.json({ StatusCode: 200, isValid: true, result: { sort:sort, count_of_data: show.rowCount, data: show.rows }, });

  } catch (err) {
    // Error in This Controller or Model Used
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// SHOW NEWEST COMMENTS BY ID RECIPE
const showNew = async (req, res) => {
  try {
    const { id_recipe, sort } = req.query;
    if(isNaN(id_recipe)){ return res.json({ StatusCode: 400, isValid: false, message: `Id_recipe data-type must integer`, }); }
    if(sort != 'asc' && sort != 'desc' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes for '?sort=' must be 'asc' or 'desc'", });
    }
    const show = await model.showNew(id_recipe, sort);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: "No one comments history", }); }
    return res.json({ StatusCode: 200, isValid: true, result: { sort:sort, count_of_data: show.rowCount, data: show.rows }, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// ADD NEW COMMENT
const newComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id_recipe, comment_text } = req.body;
    if(isNaN(id_recipe) || id_recipe == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Id_recipe data-type must integer`, }); }
    const checkidrecipe = await recipemodel.showById(id_recipe);
    // console.log(checkidrecipe.rowCount);
    if(checkidrecipe.rowCount == 0){ return res.json({ StatusCode: 400, isValid: false, message: `No data id_recipe: ${id_recipe}`, }); }
    await model.newComment(id_recipe, id_commenter, comment_text);
    return res.json({ StatusCode: 200, isValid: true, message: `Your comment succesfully to be added.`, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
}

// EDIT A COMMENT BY ID
const editComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id, comment_text } = req.body;
    // console.log(id + " " + id_commenter + "  " + comment_text);
    if (comment_text == null) { return res.status(400).send("Please input comment"); }
    
    const show = await model.selectById(id);
    if(show.rowCount == 0){ return res.json({ StatusCode: 400, isValid: true, message: `No id comment: ${id}`, }); }
    // console.log(show.rows[0].id_commenter + "  " + id_commenter);
    if(show.rows[0].id_commenter !== id_commenter){ 
      return res.json({ StatusCode: 400, isValid: false, message: `You can't edit other user comment`, }); 
    }
    
    await model.editComment(id, id_commenter, comment_text);
    return res.json({ StatusCode: 200, isValid: true, message: `Comment succesfully to be edited`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
} 

// DELETE A COMMENT BY COMMENTS.ID
const deleteComment = async (req, res) => {
  try {
    const id_commenter = req.tokenUserId;
    const { id } = req.body;
    if (isNaN(id)) { return res.json({ StatusCode: 400, isValid: false, message: `Please input Id comment`, }); }

    let inpId = id;
    const show = await model.selectById(id);
    if (show.rowCount == 0) { return res.json({ StatusCode: 200, isValid: true, message: `No one Comment Id: '${id}' on Database`, }); }
    // console.log(show.rows[0].id_commenter + "  " + id_commenter);
    if (show.rows[0].id_commenter !== id_commenter) { return res.json({ StatusCode: 400, isValid: false, message: `You can't delete other user comment`, }); }
      
    await model.deleteComment(id, id_commenter);
    return res.json({ StatusCode: 200, isValid: false, message: `Your comment id: '${inpId}' succesfully to be deleted`, });
      
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
}

module.exports = { showAll, showNew, newComment, editComment, deleteComment };