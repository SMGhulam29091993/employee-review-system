const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');
const User = require('../models/users');


passport.use(new localStrategy({
    usernameField: 'email'
},
async function (email, password, done) { 
    // Use try-catch for error handling
    try {
        let employee = await Admin.findOne({ email: email });
        if (employee) {
            if (employee.passcode === 'YOUAREADMIN' && employee.password === password) {
                return done(null, employee);
            }
        }
        
        // If the email is not found in Admin or password doesn't match, check in User
        let user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        } else {
            return done(null, user);
        }
    } catch (error) {
        return done(error); // Pass the error to done if something goes wrong
    }
}));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    return done(null, user.id);
});

// desrializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});



module.exports = passport;