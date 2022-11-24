const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

/////////////////*PASSPORT*//////////////////////// 

const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

/////////////////*RUTAS*//////////////////////// 

const User = require('./models');

////////////////*HASH*///////////////////////////

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


///////////////*Login Check*////////////////////

const loginStrategyName = 'login';


passport.use(
  loginStrategyName,
  new passportLocal.Strategy(
    {
      passReqToCallback: true,
    },
    (_request, username, password, done) => {
      User.findOne({username}, // ver si se pasa un objeto
      (error, user) => {
        if (error) {
          return done(error);
        }

        if (!user) {
          console.log(`User Not Found with username ${username}`);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false);
        }
        // si sale bien
        return done(null, user);
      });
    },
  ),
);

///////////////*SingUp Check*////////////////////

const signUpStrategyName = 'signup';

passport.use(
  signUpStrategyName,
  new passportLocal.Strategy(
    {
      passReqToCallback: true,
    },
    (request, username, password, done) => {
      User.findOne({username},
        (error, user) => {
          if (error) {
            console.log(`Error in SignUp: ${error}`);
            return done(error);
          }

          if (user) {
            console.log('User already exists');

            return done(
              null,
              false,
            );
          }

          const newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = request.body.email;
          newUser.firstName = request.body.firstName;
          newUser.lastName = request.body.lastName;

          return newUser.save((error) => {
            if (error) {
              console.log(`Error in Saving user: ${error}`);

              throw error;
            }

            console.log('User Registration succesful');

            return done(null, newUser);
          });
        },
      );
    },
  ),
);


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => done(error, user));
});

//////////////////////////////////////

const app = express();

//////////////////////////////////////////////////

app.set("views", "./views");
app.set("view engine", "ejs");

/////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  expressSession({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 10 * 1000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//////////////////////////////////////

const checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }

  return response
    .redirect(302, '/login');
};

/* Loguear usuario  */

app.get('/', (_request, response) => response.render(`pages/index`));

app.get('/login', (_request, response) => response.render(`pages/index`));

app.post(
  '/login',
  passport.authenticate(loginStrategyName, { failureRedirect: '/faillogin' }),
  (request, response) => {

  let nombre = request.user.username
  response.render(`pages/main`, {user : nombre})
  }
);

app.get('/faillogin', (_request, response) => response.render(`pages/faillogin`));

/* Registrar usuario */

app.get('/signup', 
  (_request, response) => response.render(`pages/signup`));

app.post(
  '/signup',
  passport.authenticate(signUpStrategyName, { failureRedirect: '/failsignup' }),
  (_request, response) => response.render(`pages/index`),
);

app.get('/failsignup', (_request, response) => response.render(`pages/failsignup`));

/* Deslogueo */

app.get('/logout', (request, response) => {
  const {user} = request.query;  
  
  request.logout();
  
  return response.status(200).render(`pages/logout`, {user: user})
});

/*
app.post(
  '/login',
  passport.authenticate(loginStrategyName, { failureRedirect: '/faillogin' }),
  routes.postLogin,
);

app.get('/faillogin', routes.getFaillogin);

app.get('/signup', routes.getSignup);

app.post(
  '/signup',
  passport.authenticate(signUpStrategyName, { failureRedirect: '/failsignup' }),
  routes.postSignup,
);

app.get('/failsignup', routes.getFailsignup);

app.get('/ruta-protegida', checkAuthentication, (request, response) => {
  const { user } = request;

  console.log(user);

  return response
    .status(200)
    .send('<h1>Ruta OK!</h1>');
});

app.get('/logout', routes.getLogout);

app.get('*', routes.failRoute);
*/
/// //////////////////////////////////////////////////

const PORT = process.env.PORT || 8080;

function conectarDB(url, callback) {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (!error && callback != null) {
        return callback(error);
      }

      throw error;
    },
  );
}

module.exports = {
  conectarDB,
};

conectarDB("mongodb://localhost:27017/passport", (error) => {
  if (error) {
    console.log('error en conexión de base de datos', error);

    return;
  }

  console.log('BASE DE DATOS CONECTADA');

  app.listen(PORT, (error) => {
    if (error) {
      console.log('error en listen server', error);

      return;
    }

    console.log(`Server running on port ${PORT}`);
  });
});