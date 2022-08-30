const db = require("./db");

// ADD NEW COMMENT
const tes = ( key1 ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users2 (key1) VALUES ($1)`,
      [ key1 ],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// SHOW ALL COMMENTS PUBLIC
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM users2 
      ORDER BY id DESC`,
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}; 

// SHOW NEWEST COMMENTS AND LIMIT IT
const showNew = (id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT comments.id AS id, users.name, users.id AS id_commenter, users.avatar, comments.comment_text 
      FROM users2 
      JOIN users ON comments.id_commenter = users.id 
      WHERE id_recipe = $1 
      ORDER BY comments.id DESC`,
      [id_recipe],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// SELECT COMMENT BY ID FOR EDIT OR DELETE A COMMENT
const selectById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users2 WHERE id = $1`, [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// EDIT A COMMENT BY ID
const editComment = (id, id_commenter, comment_text) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users2 SET comment_text = $1 WHERE id_commenter = $2 and id = $3`,
      [comment_text, id_commenter, id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

// DELETE A COMMENT BY ID
const deleteComment = (id, id_commenter) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM users2 WHERE id = $1 and id_commenter = $2`,
      [id, id_commenter],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  });
};

module.exports = {
  showAll,
  showNew,
  tes,
  selectById,
  editComment,
  deleteComment,
};