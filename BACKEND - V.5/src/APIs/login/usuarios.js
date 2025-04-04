    const express = require('express');
    const passport = require('passport');
    const router = express.Router();


    router.post('/',
        passport.authenticate('local', { session: false }),
        async function (req, res, next){
        try{
            res.json({ success: true, user: req.user });
        } catch(err){
            next(err);
        }
    });

    module.exports = router;
