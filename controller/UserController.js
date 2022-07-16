const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt')

const jsonwebtoken = require('jsonwebtoken')
const login = (req, resp) => {
    UserSchema.findOne({email: req.body.email}).then(exitesUser => {
        console.log(req.body.email);
        console.log(exitesUser);
        if (exitesUser !== null) {
            bcrypt.compare(req.body.password, exitesUser.password, function (err, result) {
                console.log(req.body.password)
                console.log(exitesUser.password)
                console.log(result);
                if (result) {
                    const token = jsonwebtoken.sign({
                        email: req.body.email,
                        name: req.body.name
                    }, process.env.SECRET_KEY);
                    resp.status(200).json({result: token});
                } else {
                    resp.status(401).json({message: 'UnAuthorized Attempt'})
                }
            });
        } else {
            resp.status(404).json({message: 'User not Found'})
        }
    })
}

const signUp = (req, resp) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, function (err, hash) {

        const user = new UserSchema({
            email: req.body.email,
            name: req.body.name,
            password: hash,

        });
        user.save().then(async result => {
            const token = jsonwebtoken.sign({
                email: req.body.email,
                name: req.body.name
            }, process.env.SECRET_KEY);

            resp.status(201).json({result: token, message: 'saved'});
        }).catch(err => {
            resp.status(500).json({result: err, message: 'InternalSever Error!'})
        })


    });
    console.log(req.body)


}

module.exports = {
    signUp, login
}
