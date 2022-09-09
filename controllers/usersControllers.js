const model = require("../model/usersModel"); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const multer = require('multer');
const singleUploadAvatar = require("../middleware/singleUploadAvatar");
const cloudinary = require("../middleware/cloudinary");

// var token = jwt.sign({ foo: 'bar' }, process.env.JWT_KEY, { expiresIn: 60 * 60 }, { algorithm: process.env.JWT_ALG }, 
//   // function(err, token) {
//   //   console.log(token);
//   //   console.log(process.env.JWT_KEY); 
//   //   console.log(process.env.JWT_ALG);
//   // }
// );
// // console.log(token);

// ADD NEW USER / REGISTER
const newUser = async (req, res) => {
  try {
    const { name, email, phone_number, password, password2 } = req.body;
    const avatar = "images/users_avatar/defaultAvatar.jpg";
    
    if(name == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input name`, }); }
    if(email == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input email`, }); }
    const checkemail = await model.checkemail(email);
    if(checkemail.rowCount > 0){ return res.json({ StatusCode: 200, isValid: false, message: `Email already use, try another email`, }); }
    if(phone_number == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input Phone Number`, }); }
    if(password == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input password`, }); }
    if(password !== password2){ return res.json({ StatusCode: 400, isValid: false, message: `Password didn't same`, }); }

    const hash = await bcrypt.hash(password, 5);
    await model.newUser( name, email, phone_number, hash, avatar);
    return res.json({ StatusCode: 200, isValid: true, message: "Success to Register", });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message });
  }
}
// USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input email`, }); }
    if(password == ''){ return res.json({ StatusCode: 400, isValid: false, message: `Please input password`, }); }
    const show = await model.checkemail(email);
    if(show.rowCount == 0){ return res.json({ StatusCode: 400, isValid: false, message: `Wrong Email`, }); }
    const compare = await bcrypt.compare(password, show.rows[0].password);
    if(compare == false){ return res.json({ StatusCode: 400, isValid: false, message: `Wrong password`, }); }

    var token = jwt.sign(
      show.rows[0],
      process.env.JWT_KEY,
      { expiresIn: 24 * 60 * 60 }, // EXPIRED TOKEN IN n SECOND
      { algorithm: process.env.JWT_ALG }
    );

    return res.json({ 
      StatusCode: 200,
      isValid: true,
      message: "Success to Login",
      name: show.rows[0].name, 
      token: token,
    });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message });
  }
};
// JUST GET/RES ID USER
const justGetId = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    return res.json({ StatusCode: 200, isValid: true, id: id_user });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message });
  }
};

// SHOW ALL USERS
const showAll = async (req, res) => {
  try {
    const { sort } = req.query;
    // console.log(req.query);
    // console.log(sort);

    // Validation input query 'sort'
    if(!req.query.sort){
      return res.json({ 
        StatusCode: 400, 
        isValid: false, 
        message: "Routes must be '/users/all/?sort=asc' or '/users/all/?sort=desc'" 
      });
    }
    if(sort.toLowerCase() != 'asc' && sort.toLowerCase() != 'desc' ) {
      return res.json({ StatusCode: 400, isValid: false, message: "Routes params '/?sort=' must be 'asc' or 'desc'", });
    }
    
    // SQL model Select all data in column Users table PostgreSQL Database
    const show = await model.showAll(sort);

    // If no one User on Database
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: "No one User on Database", }); }
    
    // Success show User on Database
    return res.json({ StatusCode: 200, isValid: true, result: { sort:sort, count_of_data: show.rowCount, data: show.rows }, });

  } catch (err) {
    // Error in This Controller or Model Used
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// FIND USER BY ID
const showById = async (req, res) => {
  try {
    // const { id } = req.query;
    const id = parseInt(req.params.id);
    if(isNaN(id)){ return res.json({ StatusCode: 400, isValid: false, message: `Id data-type must integer`, }); }
    const show = await model.showByIdPri(id);
    
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one User id: '${id}' on Database`, }); }
    
    return res.json({ StatusCode: 200, isValid: true, data: show.rows[0], });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// FIND USER BY NAME
const showByName = async (req, res) => {
  try {
    const name = req.params.name;
    const nameLower = name.toLowerCase();
    const show = await model.showByName(nameLower);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one User name: '${name}' on Database.`, }); }
    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// USER - MY RECIPES
const showMyRecipe = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    // const { id_user } = req.query;
    // const id_user = parseInt(req.params.id_user);
    // console.log(id_user);
    const show = await model.showMyRecipe(id_user);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one User Recipe on Database.`, }); }

    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};
// USER - MY LIKES
const showMyLikes = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const show = await model.showMyLikes(id_user);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `No one User Like on Database.`, }); }

    return res.json({ StatusCode: 200, isValid: true, result: { count_of_data: show.rowCount, data: show.rows }, });
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// ADD USER AVATAR
const addAvatar = async (req, res) => {
  try {
    
    singleUploadAvatar(req, res, async function (err) {
      // console.log(req);
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.json({ StatusCode: 400, isValid: false, message: `err instanceof multer.MulterError`, });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.json({ StatusCode: 400, isValid: false, message: err, });
      }
    
      const id_user = req.tokenUserId;
      // console.log(req?.file?.path);
      // console.log(req?.file);
      if(req?.file){

        // codingan lama
        // let correctPathImage = (req.file.path).split("\\").join("/")
        // avatar = `${correctPathImage}`
        
        try {
          const uploadImage = (await cloudinary.uploader.upload(req?.file?.path, {
            folder: "bitri_recipe/avatar",
          })) || null;
          const avatar = uploadImage.secure_url;

          await model.addAvatar(id_user, avatar);
          return res.json({ StatusCode: 200, isValid: true, message: `Avatar id: '${id_user}' succesfully to be edited.`, path: avatar});
        } catch (err) {
          console.log(err);
          return res.json({ StatusCode: 500, isValid: false, message: err, });
        }
        
      } else {
        // avatar = "images/users_avatar/defaultAvatar.jpg";
        const avatar = "https://res.cloudinary.com/dy3yw6bod/image/upload/v1662712991/bitri_recipe/avatar/kogojuf0yzwotgsygnkd.png";

        return res.json({ StatusCode: 200, isValid: true, message: `avatar didn't change`, path: avatar});
      }
    })
  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// EDIT USER DATA BY ID
const editUserData = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { name, email, phone_number } = req.body;
    
    if(email){
      const show = await model.checkemail(email);
      if(show.rowCount > 0){ return res.json({ StatusCode: 200, isValid: false, message: `Email already use, try another email`, }); }
    }

    const show = await model.showById(id_user);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `Data id: '${id_user}' not found.`, }); }
    let inpName = name || show?.rows[0]?.name; // not null
    let inpEmail = email || show?.rows[0]?.email; // not null
    let inpPhone_number = phone_number || show?.rows[0]?.phone_number;

    await model.editUserData( inpName, inpEmail, inpPhone_number, id_user );
    return res.json({ StatusCode: 200, isValid: true, message: `Id: '${id_user}' successfully to be edited.`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const show = await model.showById(id_user);
    if(show.rowCount == 0){ return res.json({ StatusCode: 200, isValid: true, message: `Data id: '${id_user}' not found.`, }); }
    if(show.rows[0].id !== id_user){ return res.json({ StatusCode: 400, isValid: false, message: `You can't delete other user account`, }); }

    await model.deleteUser(id_user);
    return res.json({ StatusCode: 200, isValid: true, message: `Data id: '${id_user}' successfully to be deleted.`, });

  } catch (err) {
    console.log(err);
    return res.json({ StatusCode: 500, isValid: false, message: err.message, });
  }
}

module.exports = {
  newUser,
  userLogin,
  showAll,
  showById,
  justGetId,
  showMyRecipe,
  showMyLikes,
  showByName,
  addAvatar,
  editUserData,
  deleteUser,
};