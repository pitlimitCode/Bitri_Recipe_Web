const db = require("./db");

// SHOW ALL USERS
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY id DESC`, // id, name, avatar
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    );
  })
};

// FIND USER BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    });
  })
}

// FIND USER BY ID * Privacy
const showByIdPri = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, name, avatar FROM users WHERE id = $1`, [id],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    });
  })
}

// SHOW USER RECIPE
const showMyRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query( `SELECT users.id AS id_user, recipes.id AS id_recipe, recipes.name AS recipe_name, recipes.image AS image FROM users JOIN recipes ON recipes.id_user = users.id WHERE users.id = $1`, [id],
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    );
  })
};

// FIND USER BY NAME
const showByName = (nameLower) => {
  return new Promise((resolve, reject) => {
    const x = `SELECT id, name, avatar From users WHERE LOWER(name) LIKE '%${nameLower}%'`;
    db.query( x,
    // db.query(`SELECT * FROM users WHERE name = $1`, [name],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    });
  })
}

// ADD NEW USER / REGISTER
const newUser = ( name, email, phone_number, password ) => { 
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4)`,
    [name, email, phone_number, password],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// USER LOGIN
const userLogin = ( email ) => { 
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [email],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// ADD USER AVATAR
const addAvatar = ( id, avatar ) => { 
  return new Promise((resolve, reject) => {
    db.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, id],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// EDIT USER DATA BY ID
const editUserData = (inpName, inpEmail, inpPhone_number, id) => {
  return new Promise((resolve, reject) => {  
    db.query(`UPDATE users SET name = $1, email = $2, phone_number = $3 WHERE id = $4`,
      [inpName, inpEmail, inpPhone_number, id],
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    )
  })
}

// DELETE USER BY ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id],
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    )
  })
}

// DELETE ALL USERS
const deleteAllUsers = () => {
  // db.query(`DELETE FROM users`), 
  // (err, result) => {
  //   if (err) { reject (err) } else { resolve (result); }
  // }
}

module.exports = {
  showAll,
  showById,
  showByIdPri,
  showMyRecipe,
  showByName,
  newUser,
  userLogin,
  addAvatar,
  editUserData,
  deleteUser,
  deleteAllUsers
};