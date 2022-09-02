const db = require("./db");
// id_user
// id_recipe
// status_type

// SHOW ALL LIKES PUBLIC
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM likes 
      ORDER BY id DESC`,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}; 

// SELECT LIKE BY ID FOR EDIT OR DELETE A LIKE
const selectById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM likes 
      WHERE id = $1`, 
      [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// SELECT LIKE BY ID FOR EDIT OR DELETE A LIKE
const checkLike = (id_user, id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM likes 
      WHERE id_user = $1 AND id_recipe = $2`,
      [id_user, id_recipe],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// ADD NEW LIKE
const newLike = (id_user, id_recipe, status_type) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO likes (id_user, id_recipe, status_type) VALUES ($1, $2, $3)`,
      [id_user, id_recipe, status_type],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// DELETE A LIKE BY ID
const deleteLike = (id_recipe, id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE 
      FROM likes 
      WHERE id_recipe = $1 AND id_user = $2`,
      [id_recipe, id_user],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

module.exports = {
  showAll,
  selectById,
  checkLike,
  newLike,
  deleteLike,
};