const model = require("../model/recipeModel");

// SHOW ALL RECIPES
const showAll = async (req, res) => {
  try {
    let { sort } = req.query;
    if(sort){
      if(sort.toLowerCase() != 'asc' && sort.toLowerCase() != 'desc' ) {
        return res.json({ StatusCode: 400, isValid: true, message: "Routes for 'sort' input must be 'asc' or 'desc'", });
      }
    }
    if(sort == undefined ) { sort = "desc" }

    const show = await model.showAll(sort);
    if (show.rowCount > 0) {
      // res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
      res.json({ errorCode: 200, isValid: true, message: { data: show.rows, count_of_data: show.rowCount }, });
    }
    if (show.rowCount == 0) {
      res.json({ errorCode: 200, isValid: true, message: "No one Recipe on Database", });
    }
  } catch (err) {
    res.json({ errorCode: 400, isValid: false, message: err.message, });
  }
};

// SHOW RECIPES IN PAGES
const showInPages = async (req, res) => {
  try {
    const { limit, pages } = req.query;
    const offset = (pages - 1) * limit;
    const show = await model.showAll();

    if (offset < 0 || limit < 1) {
      return res.status(400).send("Invalid 'limit' or 'pages' input.");
    }
    s
    const outOfPages = Math.ceil(Number(show.rowCount / limit));
    const show2 = await model.showInPages(limit, offset);
    if (show2.rowCount == 0) {
      return res.send("Out of pages.");
    } 

    return res.status(200).send({
      sett_limit_of_data_in_a_page: Number(limit),
      data: show2.rows,
      count_of_data_on_this_page: show2.rowCount,
      your_on_page: Number(pages),
      total_of_pages: outOfPages,
    });

  } catch (err) {
    res.json(
      {
        "errorCode": 400,
        "isValid": false,
        "message": err.message,
      }
    );
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// SHOW 5 NEW RECIPES
const showNew = async (req, res) => {
  try {
    const show = await model.showNew();
    if (show.rowCount > 0) {
      res.status(200).send({ count_of_data: show.rowCount, data: show.rows });
    }
    if (show.rowCount == 0) {
      res.send("No one recipe on Database.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting show 5 new recipe data.");
  }
};

// FIND RECIPE BY ID
const showById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const show = await model.showById(id);
    if (show.rowCount > 0) {
      res.status(200).send(show.rows);
    }
    if (show.rowCount == 0) {
      res.status(400).send(`No one Recipe id: '${id}' on Database.`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// FIND RECIPES BY NAME
const showByName = async (req, res) => {
  try {
    // const { name } = req.query;
    const name = req.params.name;
    const nameLower = name.toLowerCase();

    const show = await model.showByName(nameLower);
    if (show.rowCount > 0) {
      res.send({ data: show.rows, count_of_data: show.rowCount });
    }
    if (show.rowCount == 0) {
      res.send(`No one recipe, include words: '${name}' from recipes data.`);
    }
  } catch (err) {
    res.status(400).send("Something wrong while finding recipe data by name.");
  }
};

// ADD NEW RECIPE
const newRecipe = async (req, res) => {
  try {
    // console.log(req?.file);
    // console.log(req.tokenUserId);
    const id_user = req.tokenUserId;
    const { name, ingredients, step } = req.body;

    // console.log("req 1 " + req.Symbol('kHeaders'));
    // console.log("req 2 " + req.Symbol);
    // console.log("req 3 " + req.headers );

    // console.log(req);
    // console.log(req?.file?.path);
    let image;
    if(req?.file?.path){
      let correctPathImage = (req.file.path).split("\\").join("/")
      image = `${correctPathImage}`
    } else {
      image = "images/food_images/defaultRecipe.jpeg";
    }
    
    const show = await model.newRecipe(
      id_user,
      name,
      ingredients,
      step,
      image 
    );
    return res.status(200).send(`Your recipe: '${name}', succesfully to be added.`);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Something wrong while adding new recipe.");
  }
};

// ADD VIDEO TO RECIPE
const newVideo = async (req, res) => {
  const id_user = req.tokenUserId;
  const { id } = req.body;
  const video = req?.file?.path || "";
  try {
    const show = await model.showById(id);
    if (show.rowCount == 0) { return res.status(400).send(`Recipe data id: '${id}' not found.`); }

    let inpId = id;
    let inpId_user = id_user || show?.rows[0]?.id_user; // not null
    let inpVideo = video || null;

    let message = "";
    if (inpId_user) message += "id_user, ";
    if (inpVideo) message += "video, ";

    try {
      const show2 = await model.editRecipe(inpId_user, inpVideo, inpId);
      res.status(200).send(`Success to add video.`);
    } catch (err) {
      res.status(400).send("Something wrong while adding video recipe.");
    }
  } catch (err) {
    res
      .status(400).send("Something wrong while search id for adding video recipe.");
  }
};

// EDIT IMAGE RECIPE BY ID
const editImage = async (req, res) => {
  try {
    // console.log(req.file);
    // console.log(req.file.path);
    const id_user = req.tokenUserId;
    const { id } = req.body;
    let inpId = id;
    // console.log(inpId);
    // console.log(id);
    const show = await model.showById(id);

    if (show.rowCount == 0) { return res.status(400).send(`Recipe data id: '${id}' not found.`); }
    if (show.rows[0].id_user !== id_user) { return res.status(400).send(`You cann't edit other user of image recipe.`); }

    // console.log(req?.file);
    // const inpImage = req?.file?.path || "images/food_images/defaultRecipe.jpeg";
    let inpImage;
    if(req?.file?.path){
      let correctPathImage = (req.file.path).split("\\").join("/")
      inpImage = `${correctPathImage}`
    } else {
      inpImage = "images/food_images/defaultRecipe.jpeg";
    }
    
    // console.log(inpImage);

    await model.editImage(id_user, inpImage, inpId);
    if (req.file == undefined) {
      res.status(400).send("Image type file must be: png / jpg / jpeg");
    } else {
      res
        .status(200)
        .send(
          `Image of id recipe: '${inpId}' successfully to be edited.`
        );
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("Something wrong while editing recipe data.");
  }
};

// EDIT RECIPE DATA BY ID
const editRecipe = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { id, name, ingredients, step } = req.body;
    const show = await model.showById(id);
    if (show.rows[0].id_user != id_user) { return res.status(400).send(`You cann't edit other user recipe.`); }
    if (show.rowCount > 0) { return res.status(400).send(`No one Recipe with Id: ${inpId}.`); }

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
    return res.status(200).send(`Recipe id: '${inpId}' successfully to be edited.`);

  } catch (err) {
    res.status(400).send("Something wrong while editing recipe data.");
  }
};

// DELETE RECIPE BY ID
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) { return res.status(400).send("Please input id recipe."); }
    const id_user = req.tokenUserId;
    let inpId = id;

    const show = await model.showById(id);
    if (show.rowCount == 0) { return res.status(400).send(`No one Recipe id: '${id}' on Database.`); }
    if (show.rows[0].id_user !== id_user) { return res.status(400).send("You cann't delete other user recipe."); }
    
    const show2 = await model.deleteRecipe(id);
    return res.status(200).send(`Recipe data id: '${inpId}' succesfully to be deleted.`);

  } catch (err) {
    res.status(400).send(`Something wrong while try to delete id recipe: '${id}'.`);
  }
};

module.exports = {
  showAll,
  showInPages,
  showNew,
  showById,
  showByName,
  newRecipe,
  newVideo,
  editImage,
  editRecipe,
  deleteRecipe,
};
