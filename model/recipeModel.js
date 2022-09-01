const db = require("./db");

// SHOW ALL RECIPES
const showAll = (sortby) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM recipes
      ORDER BY id ${sortby}`,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// SHOW RECIPES IN PAGES
const showInPages = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, name, image
      FROM recipes
      ORDER BY id DESC
      LIMIT $1 OFFSET $2`, 
      [limit, offset],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// SHOW 5 NEW RECIPES
const showNew = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.id AS Id_recipe, users.name AS name, recipes.name AS name_recipe, recipes.image AS image_recipe 
      FROM recipes 
      JOIN users ON recipes.id_user = users.id 
      ORDER BY recipes.id DESC 
      LIMIT 5`,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// FIND RECIPE BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    // `users.name AS Username FROM recipes LEFT JOIN users ON recipes.id_user = users.id WHERE LOWER(recipes.name) LIKE '%${nameLower}%'`;
    // LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
    db.query(
      `SELECT recipes.*, users.name AS Username 
      FROM recipes 
      LEFT JOIN users ON recipes.id_user = users.id 
      WHERE recipes.id = $1`, 
      [id], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// FIND RECIPES BY NAME
const showByName = (nameLower) => {
  return new Promise((resolve, reject) => {
    // console.log(nameLower)
    const x = `SELECT users.name AS Username, recipes.id AS recipe_id, recipes.name AS name_recipe, recipes.ingredients, recipes.step, recipes.image AS image_recipe FROM recipes JOIN users ON recipes.id_user = users.id WHERE LOWER(recipes.name) LIKE '%${nameLower}%'`;
    db.query( x,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}

// ADD NEW RECIPE
const newRecipe = (id_user, name, ingredients, step, image) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (id_user, name, ingredients, step, image) VALUES ($1, $2, $3, $4, $5)`,
      [id_user, name, ingredients, step, image], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// EDIT IMAGE RECIPE BY ID
const editImage = (inpId_user, inpImage, inpId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET image = $1 WHERE id = $2 and id_user = $3`,
      [inpImage, inpId, inpId_user], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
};


// EDIT RECIPE DATA BY ID
const editRecipe = (inpId_user, inpName, inpIngredients, inpStep, inpId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET id_user = $1, name = $2, ingredients = $3, step = $4 WHERE id = $5`,
      [inpId_user, inpName, inpIngredients, inpStep, inpId], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
};

// DELETE RECIPE BY ID
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM recipes WHERE id = $1`,
      [id], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

module.exports = {
  showAll,
  showInPages,
  showNew,
  showById,
  showByName,
  newRecipe,
  editImage,
  editRecipe,
  deleteRecipe,
};