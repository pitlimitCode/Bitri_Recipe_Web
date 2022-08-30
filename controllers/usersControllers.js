const model = require("../model/usersModel"); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

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
    const { name, email, phone_number, password } = req.body;
    const avatar = "images/users_avatar/defaultAvatar.jpg";
    
    if(name == ''){ return res.status(400).send(`Please input name`); }
    if(email == ''){ return res.status(400).send(`Please input email`); }
    const checkemail = await model.checkemail(email);
    if(checkemail.rowCount > 0){ return res.status(400).send(`Email already use, try another email`); }
    if(password == '' ){ return res.status(400).send(`Please input password`); }

    const hash = await bcrypt.hash(password, 5);
    const show = await model.newUser( name, email, phone_number, hash, avatar);
    return res.status(200).send("Success to Register");

  } catch (err) {
    return res.status(400).send(`Error to Registering User: ${err.message}`);
  }
}
// USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email == ''){ return res.status(400).send(`Please input email`); }
    if(password == ''){ return res.status(400).send(`Please input password`); }

    const show = await model.checkemail(email);
    if(show.rowCount == 0){ return res.status(400).send(`Email didn't valid`); }
    const compare = await bcrypt.compare(password, show.rows[0].password);
    if(compare == false) { return res.status(400).send(`Wrong password !`); }

    var token = jwt.sign(
      show.rows[0],
      process.env.JWT_KEY,
      { expiresIn: 24 * 60 * 60 }, // EXPIRED TOKEN IN n SECOND
      { algorithm: process.env.JWT_ALG }
    );
    // console.log(token);
    res.status(200).send({
      name: show.rows[0].name, 
      id: show.rows[0].id,
      token: token, 
    });

  } catch (err) {
    console.log(err);
    res.send(`Error to Login. ${err}`);
  }
};

// SHOW ALL USERS
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount == 0){ return res.send("No one User on Database."); }
    
    return res.status(200).send({ data: show.rows, count_of_data: show.rowCount });

  } catch (err) {
    res.status(400).send(err.message);
    // res.status(400).send("Something wrong while getting all users data.");
  }
};

// FIND USER BY ID
const showById = async (req, res) => {
  try {
    const { id } = req.query;
    const show = await model.showByIdPri(id);
    if (show.rowCount == 0){ return res.send(`No one User id: '${id}' on Database.`); }
    
    return res.status(200).send({ data: show.rows, count_of_data: show.rowCount });

  } catch (err) {
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// JUST GET/RES ID USER
const justGetId = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    res.status(200).send({id: id_user});
  } catch (err) {
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// SHOW USER RECIPE
const showMyRecipe = async (req, res) => {
  try {
    const { id_user } = req.query;
    const show = await model.showMyRecipe(id_user);
    if (show.rowCount == 0){ return res.send(`No one User Recipe on Database.`); }

    return res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
  } catch (err) {
    res.status(400).send("Something wrong while finding user recipe.");
  }
};

// FIND USER BY NAME
const showByName = async (req, res) => {
  try {
    const { name } = req.body;
    const nameLower = name.toLowerCase();
    const show = await model.showByName(nameLower);
    if (show.rowCount == 0){ return res.send(`No one User name: '${name}' on Database.`); }

    return res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
  } catch (err) {
    res.status(400).send("Something wrong while finding user data by name.");
  }
};

// ADD USER AVATAR
const addAvatar = async (req, res) => {
  try {
    // console.log(req);
    const id_user = req.tokenUserId;
    const show = await model.showById(id_user);
    if (show.rowCount == 0) { return res.status(400).send(`Data id: '${id_user}' not found.`); }
    // console.log(req?.file?.path);
    // console.log(req?.file);
    // const avatar = req?.file?.path || "images/users_avatar/defaultAvatar.jpg";

    let avatar;
    if(req?.file?.path){
      let correctPathImage = (req.file.path).split("\\").join("/")
      avatar = `${correctPathImage}`
    } else {
      avatar = "images/users_avatar/defaultAvatar.jpg";
    }
    
    const show2 = await model.addAvatar(id_user, avatar);
    if (req.file == undefined) { return res.status(400).send("Image type file must be: png / jpg / jpeg"); } 

    return res.status(200).send(`Ok id: '${id_user}', your avatar succesfully to be edited.`);
  } catch (err) {
    console.log(`Error when add Avatar user: ${err}`);
    res.status(400).send(`Something wrong while getting data id: '${id_user}', for adding user avatar.`);
  }
};

// EDIT USER DATA BY ID
const editUserData = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const { name, email, phone_number } = req.body;
    
    if(email){
      const show = await model.checkemail(email);
      if(show.rowCount > 0){ return res.status(400).send(`Email already use, try another email`); }
    }

    const show = await model.showById(id_user);
    if (show.rowCount == 0) { return res.status(400).send(`Data id: '${id_user}' not found.`); }

    let inpName = name || show?.rows[0]?.name; // not null
    let inpEmail = email || show?.rows[0]?.email; // not null
    let inpPhone_number = phone_number || show?.rows[0]?.phone_number;

    const show2 = await model.editUserData( inpName, inpEmail, inpPhone_number, id_user );

    return res.status(200).send(`Id: '${id_user}' successfully to be edited.`);

  } catch (err) {
    res.status(400).send("Something wrong while editing data by id.");
  }
};

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const show = await model.showById(id_user);
    
    if (show.rows[0].id !== id_user) { return res.status(400).send("You cann't delete other user account."); } 
    if (show.rowCount == 0) { return res.status(400).send(`Id data: '${id_user}', not found.`); }
    const show2 = await model.deleteUser(id_user);
    return res.send(`Data id: '${id_user}' succesfully to be deleted.`);

  } catch (err) {
    res.status(400).send(`Something wrong while deleting data by id`);
  }
}

module.exports = {
  newUser,
  userLogin,
  showAll,
  showById,
  justGetId,
  showMyRecipe,
  showByName,
  addAvatar,
  editUserData,
  deleteUser,
};