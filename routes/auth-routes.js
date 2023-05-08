const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req,res) => {
    // res.send("LOGGING IN");
    res.render("login")
})

router.get("/logout", (req,res) => {
    res.send("LOGGING OUT");
})

router.get("/google", passport.authenticate('google', {
    scope: ['profile']
}));

router.get("/google/redirect", (req,res) => {
    res.send("google redirect");
})

module.exports = router;