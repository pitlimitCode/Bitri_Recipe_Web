const db = require("./db");

// ADD NEW USER / REGISTER
const newUser = ( name, email, phone_number, password, avatar ) => { 
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (name, email, phone_number, password, avatar) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone_number, password, avatar],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}
// USER LOGIN
const checkemail = ( email ) => { 
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM users 
      WHERE email = $1`, 
      [email],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// SHOW ALL USERS
const showAll = (sortby) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM users 
      ORDER BY id ${sortby}`,
      // [sortby],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// FIND USER BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * 
      FROM users 
      WHERE id = $1`,
      [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}

// FIND USER BY ID * Privacy (id, name, avatar)
const showByIdPri = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, name, avatar 
      FROM users 
      WHERE id = $1`,
      [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}

// SHOW USER RECIPE
const showMyRecipe = (id_user) => {
  return new Promise((resolve, reject) => {
    db.query( 
      `SELECT users.id AS id_user, recipes.id AS id_recipe, recipes.name AS recipe_name, recipes.image AS image 
      FROM users
      JOIN recipes ON recipes.id_user = users.id 
      WHERE users.id = $1
      ORDER BY users.id DESC`,
      [id_user],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
};

// FIND USER BY NAME
const showByName = (nameLower) => {
  return new Promise((resolve, reject) => {
    const x = `SELECT id, name, avatar From users WHERE LOWER(name) LIKE '%${nameLower}%'`;
    db.query( x,
    // db.query(`SELECT * FROM users WHERE name = $1`, [nameLower],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    );
  })
}

// ADD USER AVATAR
const addAvatar = ( id, avatar ) => { 
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET avatar = $1 
      WHERE id = $2`, 
      [avatar, id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// EDIT USER DATA BY ID
const editUserData = (inpName, inpEmail, inpPhone_number, id) => {
  return new Promise((resolve, reject) => {  
    db.query(
      `UPDATE users SET name = $1, email = $2, phone_number = $3 
      WHERE id = $4`,
      [inpName, inpEmail, inpPhone_number, id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

// DELETE USER BY ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM users 
      WHERE id = $1`, 
      [id],
      (error, result) => { if (error) { reject (error) } else { resolve (result) } }
    )
  })
}

module.exports = {
  newUser,
  checkemail,
  showAll,
  showById,
  showByIdPri,
  showMyRecipe,
  showByName,
  addAvatar,
  editUserData,
  deleteUser,
};