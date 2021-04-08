const router = require('express').Router();
const User = require('../MODEL/User');
const verify = require('./verifyToken');

router.get('/', async (req, res)=> {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({ message: err })
    }
});


module.exports = router;