const router = require('express').Router();
const User = require('../MODEL/User');

//validation
// const Joi = require('@hapi/joi');
// const schema = {
//     name: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(4).required()
// };

router.post('/register', async (req,res)=> {

    //validate user
    // const { error } = Joi.validate(req.body, schema);
    // res.send(error)

    // if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});
//test get 
router.get('/login', (req,res)=> {
    res.send('logged in');
});

module.exports = router;