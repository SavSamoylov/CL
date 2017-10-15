require('dotenv-safe').load();
const path = require('path')
const xps = require("./xps.js")
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport');
const htmlroutes = require("./routes/html-routes");


const app = xps.app();

let PORT = process.env.PORT || 3001;

xps.go(app,
  {
    staticView: "public", // Also takes an array of strings for multiple view folders.
    viewEngine: "express-handlebars",
    bodyParse: ["json", "raw", "urlencoded", "text"], // TRUE or [ARRAY]
    validator: true,
    cookieParse: true,
    flash: true,
    httpLogger: "morgan",
  }
)

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// Handle Sessions
// -----------------------------------------------------------------------------
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
// -----------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
const localSignupStrategy = require('./config/local-signup');
const localLoginStrategy = require('./config/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// pass the authenticaion checker middleware
const authCheckMiddleware = require('./config/middleware/auth-check');
app.use('/api', authCheckMiddleware);


// Routes
// -----------------------------------------------------------------------------
// routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Register
let post_Page = require(path.join(__dirname, "routes/post-page-api.js"))
app.use("/region/forsale/category/post/", post_Page)



// Display 404 for unrecognized Routes
app.get('*', function(req, res){
  res.send('404');
  console.log(req.cookies.cookieId)
});


// Database Models
// -----------------------------------------------------------------------------
let db = require('./models')


db.sequelize.sync().then(function(){
  app.listen(PORT, (err)=>{
    if (err) console.log(err)
    console.log("++ Server started on PORT ", PORT)
  })
})
