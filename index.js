const express = require("express");
const app = express(); 

// Body Parser.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet.
const helmet = require("helmet");
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS.
const cors = require("cors");
app.use(cors());
var allowlist = 
  [
    "https://bitri-recipe.herokuapp.com",
    "http://localhost:8000",
    "https://bitri-recipe.web.app",
    "https://bitrirecipeweb-production.up.railway.app",
    "http://localhost:3000"
  ];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
// const corsOptionsDelegate = {
// 	origin: function (origin, callback) {
// 		if (allowlist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowaned by CORS"));
// 		}
// 	},
// };

// Static path from express.js local storage.
// app.use('/images', express.static('images'));

// Routes.
const usersRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const likesRoutes = require("./routes/likesRoutes");
// const savesRoutes = require("./routes/savesRoutes");
app.use("/", cors(corsOptionsDelegate), usersRoutes);
app.use("/", cors(corsOptionsDelegate), recipesRoutes);
app.use("/", cors(corsOptionsDelegate), commentsRoutes);
app.use("/", cors(corsOptionsDelegate), likesRoutes);
// app.use("/", cors(corsOptionsDelegate), savesRoutes);

// const tesRoutes = require("./routes/tesRoutes");
// app.use("/", cors(corsOptionsDelegate), tesRoutes);

// app.use("/tes", (req, res) => {res.send("tes tanpa Cors, berhasil.")});
// app.use("*", (req, res) => {res.send("You access no one valid URL in this Site.")});
app.use("*", (req, res) => {res.send([
  'Endpoints:',
  '/users/all/?sort=[asc/desc]',
  '/users/id/[id_user_number)]',
  '/users/name/[name_user]',
  '/recipes/all/?sort=[asc/desc]',
  '/recipes/pagination/?limit=[limit_number]&pages=[page_number]&sort=[asc/desc]',
  '/recipes/fivelikes',
  '/recipes/id/[id_recipe_number)]',
  '/recipes/name/?name=[name_recipe]&sort=[asc/desc/like]',
  '/comments/all/?sort=[asc/desc]',
  '/comments/new/?id_recipe=[id_number]&sort=[asc/desc]',
  '/likes/all',
])});

// Listen the Port.
require('dotenv').config();
const port = process.env.PORT || 8000; // port database
app.listen(port, () => console.log(`[nodemon] running from port: '${port}'.`));