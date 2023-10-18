const Admin = require('../models/admin');
const User = require('../models/users');

module.exports.admin_dashboard = (req,res)=>{
    return res.render('admin_dashboard',{
        title : 'Admin Dashboard'
    })
}



module.exports.admin_sign_up = (req,res)=>{
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
                password: req.body.password
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
    return res.render('admin_sign_in',{
        title : 'Admin Sign-In'
    });
};