const db = require("./db");

// SHOW ALL likes PUBLIC
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

// SHOW NEWEST likes AND LIMIT IT
const showByUser = (id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT likes.id AS id, users.name, users.id AS id_user, users.avatar, likes.comment_text 
      FROM likes 
      JOIN users ON likes.id_user = users.id 
      WHERE id_recipe = $1 
      ORDER BY likes.id DESC`,
      [id_recipe],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// // ADD NEW COMMENT
// const newComment = (id_recipe, id_user, comment_text) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `INSERT INTO likes (id_recipe, id_user, comment_text) VALUES ($1, $2, $3)`,
//       [id_recipe, id_user, comment_text],
//       (error, result) => { if (error) { reject (error) } else { resolve (result) } }
//     );
//   });
// };

// SELECT COMMENT BY ID FOR EDIT OR DELETE A COMMENT
const selectById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM likes WHERE id = $1`, [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// EDIT A COMMENT BY ID
const editComment = (id, id_user, comment_text) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE likes SET comment_text = $1 WHERE id_user = $2 and id = $3`,
      [comment_text, id_user, id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// DELETE A COMMENT BY ID
const deleteComment = (id, id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM likes WHERE id = $1 and id_user = $2`,
      [id, id_user],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

module.exports = {
  showAll,
  showByUser,
  // newComment,
  selectById,
  editComment,
  deleteComment,
};