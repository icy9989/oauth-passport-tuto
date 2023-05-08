const express = require("express");
const app = express();
const authRouter = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");

// set up view engine
app.set("view engine", "ejs");

// create home route
app.get("/", (req,res) => {
    // res.send("HOME PAGE");
    res.render("home.ejs")
})

// use auth route
app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log("App is listening at port 3000");
})