const model = require("../model/likesModel");
const recipemodel = require("../model/recipeModel");

// SHOW ALL LIKES PUBLIC
const showAll = async (req, res) => {
  try {
    // SQL model Select all data in column Likes table PostgreSQL Database
    const show = await model.showAll();
    
    // If no one Like on Database
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: "No one Like on Database", }); }
    
    // Success show Likes on Database
    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });

  } catch (err) {
    // Error in This Controller or Model Used
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// ADD NEW LIKE
const newLike = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { id_recipe } = req.body;
    if(isNaN(id_recipe) || id_recipe == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Id_recipe data-type must integer`, }); }

    const checkidrecipe = await recipemodel.showById(id_recipe);
    // console.log(checkidrecipe.rowCount);
    if(checkidrecipe.rowCount == 0){ return res.json({ StatusCode: 400, isValid: false, message: `No data id_recipe: ${id_recipe}`, }); }

    const isLike = await model.checkLike(id_user, id_recipe);
    // console.log(isLike.rowCount);
    if(isLike.rowCount == 1){ return res.json({ StatusCode: 400, isValid: false, message: `Id user: ${id_user} ALREADY LIKE Id recipe: ${id_recipe}`, }); }

    const status_type = 1;
    await model.newLike(id_user, id_recipe, status_type);

    return res.json({ StatusCode: 200, isValid: true, message: `Id user: ${id_user} SUCCESS TO LIKE Id recipe: ${id_recipe}`, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
}

// DELETE A LIKE BY LIKES.ID
const deleteLike = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { id_recipe } = req.body;
    if (isNaN(id_recipe)) { return res.json({ StatusCode: 400, isValid: false, message: `Please input Id Recipe`, }); }

    let inpId = id_recipe;
    const show = await recipemodel.showById(id_recipe);
    if (show.rowCount == 0) { return res.json({ StatusCode: 200, isValid: true, message: `No one Id recipe: '${id_recipe}' on Database`, }); }
    // console.log(show.rows[0].id_user + "  " + id_user);
    if (show.rows[0].id_user !== id_user) { return res.json({ StatusCode: 400, isValid: false, message: `User id: '${id_user}' can't delete other user like`, }); }
      
    const isLike = await model.checkLike(id_user, id_recipe);
    // console.log(isLike.rowCount);
    if(isLike.rowCount == 0){ return res.json({ StatusCode: 400, isValid: false, message: `No data history for Id user: ${id_user} like Id recipe: ${id_recipe}`, }); }

    await model.deleteLike(id_recipe, id_user);
    return res.json({ StatusCode: 200, isValid: false, message: `Like id: '${inpId}' succesfully to be deleted`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
}

module.exports = { 
  showAll, 
  newLike, 
  deleteLike, 
};