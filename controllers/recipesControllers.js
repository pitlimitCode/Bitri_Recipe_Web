const model = require("../model/recipeModel");
const multer = require('multer');
const singleUploadRecipe = require("../middleware/singleUploadRecipe");
const cloudinary = require("../middleware/cloudinary");

// SHOW ALL RECIPES
const showAll = async (req, res) => {
  try {
    let { sort } = req.query;

    // Validation input query 'sort'
    if(!req.query.sort){
      return res.json({ 
        StatusCode: 400, 
        isValid: false, 
        message: "Routes must be '/recipes/all/?sort=asc' or '/recipes/all/?sort=desc'" 
      });
    }
    if(sort.toLowerCase() != 'asc' && sort.toLowerCase() != 'desc' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes for '/?sort=' must be 'asc' or 'desc'", });
    }

    // SQL model Select all data in column Recipes table PostgreSQL Database
    const show = await model.showAll(sort);
    
    // If no one Recipe on Database
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: "No one Recipe on Database", }); }
    
    // Success show Recipe on Database
    return res.json({ StatusCode: 200, isValid: true, result: { sort:sort, count_of_data: show.rowCount, data: show.rows }, });

  } catch (err) {
    // Error in This Controller or Model Used
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// FIND RECIPE BY ID
const showById = async (req, res) => {
  try {
    // const { id } = req.query;
    const id = parseInt(req.params.id);
    if(isNaN(id)){ return res.json({ StatusCode: 400, isValid: false, message: `Id data-type must integer`, }); }
    const show = await model.showById(id);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one Recipe id: '${id}' on Database.`, }); }
    
    return res.json({ StatusCode: 200, isValid: true, data: show.rows, });
    
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// FIND RECIPES BY NAME
const showByName = async (req, res) => {
  try {
    // const name = req.params.name;
    // const sort = req.params.sort;
    const { name, sort } = req.query;

    if(sort.toLowerCase() != 'asc' && sort.toLowerCase() != 'desc' && sort.toLowerCase() != 'like' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes for '&sort=' must be 'asc' / 'desc' / 'like'", });
    }
    
    const nameLower = name.toLowerCase();
    const show = await model.showByName(nameLower, sort);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one Recipe include words: '${name}' from recipes data`, }); }
    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// SHOW RECIPES IN PAGES
const showInPages = async (req, res) => {
  try {
    const { limit, pages, sort } = req.query;
    
    if(sort != 'asc' && sort != 'desc' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes for '/?sort=' must be 'asc' or 'desc'", });
    }

    const offset = (pages - 1) * limit;
    const show = await model.showAll(sort);
    // console.log(show);

    if (offset < 0 || limit < 1) {
      return res.json({ StatusCode: 400, isValid: true, message: "Invalid 'limit' or 'pages' input", });
    }
    
    const outOfPages = Math.ceil(Number(show.rowCount / limit));
    const show2 = await model.showInPages(limit, offset, sort);
    if(show.rowCount == 0){ return res.json({ StatusCode: 400, isValid: true, message: "Out of pages !", }); }

    return res.json({ 
      StatusCode: 200, 
      isValid: true, 
      result: { 
        limit_data_in_a_page: Number(limit),
        currently_page: Number(pages),
        count_of_data_in_currently_page: show2.rowCount,
        total_of_pages: outOfPages,
        data: show2.rows,
      }, 
    });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// SHOW BY MOST LIKES 5
const showNew = async (req, res) => {
  try {
    const show = await model.showNew();
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one recipe on Database`, }); }
    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// ADD NEW RECIPE
const newRecipe = async (req, res) => {
  try {
    singleUploadRecipe(req, res, async function (err) {
      try {
        // console.log(err);
        if (await err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.json({ StatusCode: 400, isValid: false, message: `err instanceof multer.MulterError`, });
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.json({ StatusCode: 400, isValid: false, message: err, });
        }
      } catch (err) {
        console.log(err);
        return res.json({ StatusCode: 500, isValid: false, message: err, });
      }
    
      const id_user = req.tokenUserId;
      const { name, ingredients, step } = req.body;
      // console.log(req);
      console.log(req?.file);

      let image;
      if(req?.file){
        // let correctPathImage = (req.file.path).split("\\").join("/")
        // image = `${correctPathImage}`
        
        const uploadImage = (await cloudinary.uploader.upload(req?.file?.path, {
          folder: "bitri_recipe/recipe",
        })) || null;
        image = uploadImage.secure_url;
        await model.newRecipe( id_user, name, ingredients, step, image );
        return res.json({ StatusCode: 200, isValid: true, message: `Your recipe: '${name}', succesfully to be added.`, path: image });

      } else {
        image = "https://res.cloudinary.com/dy3yw6bod/image/upload/v1662711416/bitri_recipe/recipe/vsfl2jqubqz6dialkn5t.jpg";
        await model.newRecipe( id_user, name, ingredients, step, image );
        return res.json({ StatusCode: 200, isValid: true, message: `Your recipe: '${name}', succesfully to be added.`, path: image });
      }
      
      // console.log(req?.file);
      // if(req.file == undefined){ return res.json({ StatusCode: 400, isValid: false, 
      //   message: `Image type file must be: png / jpg / jpeg`, 
      // }); }


    })

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// EDIT IMAGE RECIPE BY ID
const editImage = async (req, res) => {
  try {
    singleUploadRecipe(req, res, async function (err) {
      
      try {
        // console.log(req);
        if (await err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.json({ StatusCode: 400, isValid: false, message: `err instanceof multer.MulterError`, });
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.json({ StatusCode: 400, isValid: false, message: err, });
        }
      } catch (err) {
        console.log(err);
        return res.json({ StatusCode: 500, isValid: false, message: err, });
      }
    
      const id_user = req.tokenUserId;
      const { id_recipe } = req.body;
      // console.log(id_recipe);
      const show = await model.showById(id_recipe);
      if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `Recipe data id: '${id_recipe}' not found.`, }); }
      if(show.rows[0].id_user !== id_user){ 
        return res.json({ StatusCode: 400, isValid: false, message: `You can't edit other user of image recipe`, }); 
      }

      // console.log(req?.file);
      if(req?.file){

        // let correctPathImage = (req.file.path).split("\\").join("/")
        // inpImage = `${correctPathImage}`
        
        const uploadImage = (await cloudinary.uploader.upload(req?.file?.path, {
          folder: "bitri_recipe/recipe",
        })) || null;
        const inpImage = uploadImage.secure_url;
        await model.editImage(inpImage, id_recipe);
        return res.json({ StatusCode: 200, isValid: true, message: `Image of id recipe: '${id_recipe}' successfully to be edited`, path: inpImage });

      } else {
        const inpImage = show?.rows[0]?.image;
        return res.json({ StatusCode: 200, isValid: true, message: `Image recipe didn't change`, path: inpImage });
      }
      
      // if(req.file == undefined){ return res.json({ StatusCode: 400, isValid: false, message: `Image type file must be: png / jpg / jpeg`, }); }

    })

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// EDIT RECIPE DATA BY ID
const editRecipe = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { id, name, ingredients, step } = req.body;

    const show = await model.showById(id);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: false, message: `No one Recipe with Id: ${id}.`, }); }
    if(show.rows[0].id_user != id_user){ return res.json({ StatusCode: 400, isValid: false, message: `You can't edit other user recipe`, }); }

    let inpId = id;
    let inpId_user = id_user; // not null
    let inpName = name || show?.rows[0]?.name; // not null
    let inpIngredients = ingredients || show?.rows[0]?.ingredients; // not null
    let inpStep = step || null;

    await model.editRecipe(
      inpId_user,
      inpName,
      inpIngredients,
      inpStep,
      inpId
    );
    
    return res.json({ StatusCode: 200, isValid: true, message: `Recipe id: '${inpId}' successfully to be edited.`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// ADD VIDEO TO RECIPE
const newVideo = async (req, res) => {
  const id_user = req.tokenUserId;
  const { id } = req.body;
  const video = req?.file?.path || "";
  try {
    const show = await model.showById(id);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `Recipe data id: '${id}' not found.`, }); }

    let inpId = id;
    let inpId_user = id_user || show?.rows[0]?.id_user; // not null
    let inpVideo = video || null;

    let message = "";
    if (inpId_user) message += "id_user, ";
    if (inpVideo) message += "video, ";

    await model.editRecipe(inpId_user, inpVideo, inpId);
    return res.json({ StatusCode: 200, isValid: true, message: `Success to add video`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// DELETE RECIPE BY ID
const deleteRecipe = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const id = parseInt(req.params.id);
    // const { id } = req.body;
    if (isNaN(id)) { return res.json({ StatusCode: 400, isValid: false, message: `Please input id recipe`, }); }

    let inpId = id;
    const show = await model.showById(id);
    if (show.rowCount == 0) { return res.json({ StatusCode: 200, isValid: true, message: `No one Recipe id: '${id}' on Database`, }); }
    // console.log(show.rows[0].id_user + "  " + id_user);
    if (show.rows[0].id_user !== id_user) { return res.json({ StatusCode: 400, isValid: false, message: `You can't delete other user recipe`, }); }
    
    await model.deleteRecipe(id);
    return res.json({ StatusCode: 200, isValid: false, message: `Recipe data id: '${inpId}' succesfully to be deleted`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

module.exports = {
  showAll,
  showById,
  showByName,
  showInPages,
  showNew,
  newRecipe,
  editImage,
  editRecipe,
  newVideo,
  deleteRecipe,
};
