const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req,res) => {
    // res.send("LOGGING IN");
    res.render("login", { user: req.user })
})

router.get("/logout", (req,res) => {
    req.logout((err) => {
        if(err) {
            console.log(err);
        }
    });
    res.redirect("/")
})

router.get("/google", passport.authenticate('google', {
    scope: ['profile']
}));

router.get("/google/redirect", passport.authenticate('google'),(req,res) => {
    // res.send("google redirect");
    // res.send(req.user)
    res.redirect('/profile');
})

router.get("/facebook", passport.authenticate('facebook', {
    scope: ['public_profile']
}));

router.get("/facebook/redirect", passport.authenticate('facebook'), (req,res) => {
    // res.send("logging in with facebook")
    res.redirect("/profile");
})

module.exports = router;