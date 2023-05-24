const express = require("express");
const app = express();
const authRouter = require("./routes/auth-routes");
const profileRouter = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const User = require("./models/user-model")

// set up view engine
app.set("view engine", "ejs");

// mongo db connection
const connect = async () => {
    try {
        await mongoose.connect(keys.mongodb.connection);
        console.log("Database connected successfully")
    } catch (err) {
        console.log("err", err);
    }
}
connect();

// use cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// there is some error with req.session.regenerate() for passport v6

// 1st way with passport v6
// register regenerate & save after the cookieSession middleware initialization
app.use(function(req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb()
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb()
        }
    }
    next()
})

// 2nd way
// uninstall passport v6 and re install passport v5

// 3rd way
// use express-session instead of cookie-session
// npm install express-session
// const session = require('express-session')
// app.use(session({
//    secret: 'somethingsecretgoeshere',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: true }
// }));

app.use(passport.initialize());
app.use(passport.session());

// create home route
app.get("/", (req,res) => {
    // res.send("HOME PAGE");
    res.render("home.ejs", { user: req.user })
})

app.get("/user", (req,res) => {
    // res.send("HOME PAGE");
    const user = User.find();
    res.send(user);
})


// use auth route
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})