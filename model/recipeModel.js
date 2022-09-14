const db = require("./db");
// id_user
// id_recipe
// status_type

// SHOW ALL RECIPES

const showAll = (sortby) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.*, COUNT(likes.status_type) AS total_likes 
      FROM recipes
      LEFT JOIN likes ON recipes.id = likes.id_recipe
      GROUP BY recipes.id
      ORDER BY recipes.id ${sortby} `,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// FIND RECIPE BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.*, users.name AS username, COUNT(likes.status_type = 1) AS total_likes
      FROM recipes 
      LEFT JOIN users ON recipes.id_user = users.id
      LEFT JOIN likes ON recipes.id = likes.id_recipe
      WHERE recipes.id = $1
      GROUP BY recipes.id, users.name `, 
      [id], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// FIND RECIPES BY NAME
const showByName = (nameLower, sort) => {
  let orderBy = '';
  if(sort == 'asc' || sort == 'desc'){
    orderBy = `recipes.id ${sort}`
  } else {
    orderBy = `total_likes DESC`
  }
  return new Promise((resolve, reject) => {
    // console.log(nameLower)
    db.query( 
      `
      SELECT recipes.id AS recipe_id, recipes.name AS name_recipe, recipes.image AS image_recipe, users.name AS username, COUNT(likes.status_type) AS total_likes 
      FROM recipes 
      LEFT JOIN users ON recipes.id_user = users.id 
      LEFT JOIN likes ON recipes.id = likes.id_recipe
      WHERE LOWER(recipes.name) LIKE '%${nameLower}%'
      GROUP BY recipes.id, users.name
      ORDER BY ${orderBy}
      `,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}

// SHOW RECIPES IN PAGES
const showInPages = (limit, offset, sort) => {
  // console.log(limit, offset, sort);
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, name, image
      FROM recipes
      ORDER BY id ${sort}
      LIMIT $1 OFFSET $2`, 
      [limit, offset],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// SHOW BY MOST LIKES 5
const showNew = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.id AS Id_recipe, users.name AS name, recipes.name AS name_recipe, recipes.image AS image_recipe, COUNT(likes.status_type) AS total_likes  
      FROM recipes 
      LEFT JOIN users ON recipes.id_user = users.id 
      LEFT JOIN likes ON recipes.id = likes.id_recipe
      GROUP BY recipes.id, users.name
      ORDER BY total_likes DESC 
      LIMIT 5`,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// ADD NEW RECIPE
const newRecipe = (id_user, name, ingredients, step, image, video) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (id_user, name, ingredients, step, image, video) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_user, name, ingredients, step, image, video], 
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// EDIT IMAGE RECIPE BY ID
const editImage = (inpImage, inpId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET image = $1 WHERE id = $2`,
      [inpImage, inpId], 
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
  showById,
  showByName,
  showInPages,
  showNew,
  newRecipe,
  editImage,
  editRecipe,
  deleteRecipe,
};