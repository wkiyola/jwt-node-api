const router = require('express').Router();
const User = require('../MODEL/User');
const bcrypt = require('bcryptjs');
const { loginValidation, registerValidation } = require('../validation');

router.post('/register', async (req,res)=> {

    //validate register info
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   //check if user already exists in database
   const emailExists = await User.findOne({email: req.body.email});
   if(emailExists) return res.status(400).send('Email already exists');

   const salt = bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err) {
        res.status(400).send(err);
    }
});

//login post route
router.post('/login', async(req,res)=> {

    //validate login info
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user already exists in database
   const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('Email or password is wrong');

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Email or password is wrong');

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token)
    res.send('logged in');
});

module.exports = router;