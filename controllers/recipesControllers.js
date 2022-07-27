const model = require("../model/recipeModel");

// SHOW ALL RECIPES
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0) {
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    }
    if (show.rowCount == 0) {
      res.send("No one recipe on Database.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// SHOW RECIPES IN PAGES
const showInPages = async (req, res) => {
  try {
    const { limit, pages } = req.query;
    const offset = (pages - 1) * limit;
    const show = await model.showAll();

    if (offset < 0 || limit < 1) {
      res.status(400).send("Invalid 'limit' or 'pages' input.");
    } else {
      try {
        const outOfPages = Math.ceil(Number(show.rowCount / limit));

        const show2 = await model.showInPages(limit, offset);
        if (show2.rowCount == 0) {
          res.send("Out of pages.");
        } else {
          res
            .status(200)
            .send({
              sett_limit_of_data_in_a_page: Number(limit),
              data: show2.rows,
              count_of_data_on_this_page: show2.rowCount,
              your_on_page: Number(pages),
              total_of_pages: outOfPages,
            });
        }
      } catch (err) {
        res.status(400).send(err.message);
      }
    }
  } catch (err) {
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
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// FIND RECIPE BY ID
const showById = async (req, res) => {
  try {
    const { id } = req.query;
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
    const { name } = req.query;
    const nameLower = name.toLowerCase();

    const show = await model.showByName(nameLower);
    if (show.rowCount > 0) {
      res.send({ data: show.rows, count_of_data: show.rowCount });
    }
    if (show.rowCount == 0) {
      res.send(`No one recipe name: '${name}' from recipes data.`);
    }
  } catch (err) {
    // res.status(400).send("Something wrong while finding recipe data by name.");
  }
};

// ADD NEW RECIPE
const newRecipe = async (req, res) => {
  try {
    // console.log(req.tokenUserId);
    const id_user = req.tokenUserId;
    const image = "images/food_images/defaultRecipe.jpeg";
    const { name, ingredients, step } = req.body;
    console.log(`${id_user}, ${name}, ${ingredients}, ${step}, ${image}`);
    try {
      const show = await model.newRecipe(
        id_user,
        name,
        ingredients,
        step,
        image
      );
      res.status(200).send(`Your recipe: '${name}', succesfully to be added.`);
    } catch (err) {
      res
        .status(400)
        .send("Something wrong while adding new recipe: " + err.message);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in req.body data.");
  }
};

// ADD VIDEO TO RECIPE
const newVideo = async (req, res) => {
  const id_user = req.tokenUserId;
  const { id } = req.body;
  const video = req?.file?.path || "";
  try {
    const show = await model.showById(id);
    if (show.rowCount > 0) {
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
    } else {
      res.status(400).send(`Recipe data id: '${id}' not found.`);
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

    if (show.rowCount = 0) {
      return res.status(400).send(`Recipe data id: '${id}' not found.`);
    }
    if (show.rows[0].id_user !== id_user) {
      return res.status(400).send(`You cann't edit other user of image recipe.`);
    }

    try {
      // const inpImage = req?.file?.path || "images/defaultAvatar.jpeg";
      let inpImage;
      console.log(req.file.path);
      if(req?.file?.path){
        let correctPathImage = (req.file.path).split("\\").join("/")
        // console.log(correctPathImage);
        inpImage = `${correctPathImage}`
      } else {
        inpImage = `images/defaultRecipe.jpeg`
      }
      
      // console.log(inpImage);

      const show = await model.editImage(id_user, inpImage, inpId);
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
      res
        .status(400)
        .send("Something wrong while edit image recipe data by id.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while editing recipe data.");
  }
};

// EDIT RECIPE DATA BY ID
const editRecipe = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { id, name, ingredients, step } = req.body;
    try {
      const show = await model.showById(id);
      if (show.rows[0].id_user == id_user) {
        if (show.rowCount > 0) {
          let inpId = id;
          let inpId_user = id_user; // not null
          let inpName = name || show?.rows[0]?.name; // not null
          let inpIngredients = ingredients || show?.rows[0]?.ingredients; // not null
          let inpStep = step || null;

          try {
            const show = await model.editRecipe(
              inpId_user,
              inpName,
              inpIngredients,
              inpStep,
              inpId
            );
            res
              .status(200)
              .send(`Recipe id: '${inpId}' successfully to be edited.`);
          } catch (err) {
            res
              .status(400)
              .send("Something wrong while edit recipe data by id.");
          }
        } else {
          res.status(400).send(`No one Recipe with Id: ${inpId}.`);
        }
      } else {
        res.status(400).send(`You cann't edit other user recipe.`);
      }
    } catch (err) {
      res.status(400).send("Something wrong while editing recipe data.");
    }
  } catch (err) {
    res.status(400).send("Error in req.body data.");
  }
};

// DELETE RECIPE BY ID
const deleteRecipe = async (req, res) => {
  const id_user = req.tokenUserId;
  const { id } = req.body;
  if (id) {
    let inpId = id;
    try {
      const show = await model.showById(id);
      if (show.rowCount > 0) {
        if (show.rows[0].id_user !== id_user) {
          res.status(400).send("You cann't delete other user recipe.");
        } else {
          try {
            const show2 = await model.deleteRecipe(id);
            res
              .status(200)
              .send(`Recipe data id: '${inpId}' succesfully to be deleted.`);
          } catch (err) {
            res
              .status(400)
              .send("Something wrong while deleting recipe data by id");
          }
        }
      } else {
        res.status(400).send(`No one Recipe id: '${id}' on Database.`);
      }
    } catch (err) {
      res
        .status(400)
        .send(`Something wrong while searching id: '${id}' before delete it.`);
    }
  } else {
    res.status(400).send("Please input id recipe.");
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
