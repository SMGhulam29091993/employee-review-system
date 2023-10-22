const Admin = require('../models/admin');
const User = require('../models/users');
const passport = require('../config/passport-local-strategy');


module.exports.admin_dashboard = (req,res)=>{
    return res.render('admin_dashboard',{
        title : 'Admin Dashboard'
    })
}

module.exports.admin_profile = (req,res)=>{
    return res.render('profile',{
        title : `${req.user.name} Profile`
    })
}


module.exports.admin_sign_up = (req,res)=>{
    if(req.isAuthenticated() && req.user.passcode === 'YOUAREADMIN'){
        return res.redirect('/admin/profile');
    };
    return res.render('admin_sign_up',{
        title : 'Admin Sign-Up'
    });
};

module.exports.create = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) {
            return res.redirect('/admin/sign-in');
        } else if (req.body.passcode === 'YOUAREADMIN') { // Check the passcode
            await Admin.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passcode : req.body.passcode
            });
            return res.redirect('/admin/sign-in');
        } else {
            // Handle invalid passcode here, e.g., show an error message.
            console.log('You are not authorise create this profile')
            return res.redirect('/admin/sign-up'); // Or some other appropriate action.
        }
    } catch (err) {
        console.log(`Error in creating the admin: ${err}`);
        res.status(500).send('Internal server error');
    }
}

module.exports.admin_sign_in = (req,res)=>{
    if(req.isAuthenticated() && req.user.passcode === 'YOUAREADMIN'){
        return res.redirect('/admin/profile');
    };
    return res.render('admin_sign_in',{
        title : 'Admin Sign-In'
    });
};

module.exports.create_admin_session = (req,res)=>{
    return res.redirect('/admin/profile');
};

module.exports.destroy_admin_session = (req,res)=>{
    req.logout((err) => {
        if (err) {
            console.log(`Error logging out: ${err}`);
            return res.redirect('/admin/profile'); // Redirect to a different page or handle the error as needed
        }

        return res.redirect('/');
    });
};