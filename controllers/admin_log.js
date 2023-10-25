const Admin = require('../models/admin');
const User = require('../models/users');
const Review = require('../models/review');
const passport = require('../config/passport-local-strategy');

module.exports.home = (req,res)=>{
    return res.render('home',{
        title : 'Home'
    })
}

module.exports.admin_dashboard = async (req,res)=>{
    let user = await User.find({});
    let admin = await Admin.find({});

    return res.render('admin_dashboard',{
        title : 'Admin Dashboard',
        all_users : user,
        all_admin : admin
    })
}




module.exports.admin_profile = async (req, res) => {
    try{
        let admin = await Admin.findById(req.params.id);
        if(admin){
            return res.render('profile',{
                title : `${admin.name} Profile`,
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports.update_profile_admin = async (req,res)=>{
    try{
        let admin = await Admin.findById(req.params.id);
        return res.render('update_profile',{
            title : `${admin.name} Profile Update`,
            user : admin
        });
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
    
};

module.exports.create_update_admin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.address = req.body.address;
            admin.mobile = req.body.mobile;
            admin.bloodGroup = req.body.bloodGroup;
            admin.designation = req.body.designation;
            admin.department = req.body.department;

            await admin.save();
        }

        return res.redirect('/admin/home');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}


module.exports.destroy_user = async (req, res) => {
    try {
        // Get the user's ID from the request parameters
        const userId = req.params.id;

        // Find the user by ID and remove it
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).send('User not found');
        }

        // Redirect to a different page or handle the success as needed
        return res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        // Redirect to a different page or handle errors as needed
        res.redirect('/admin/dashboard');
    }
};


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


module.exports.makeUserAdmin = async (req,res)=>{
    try{    
        let user = await User.findById(req.params.id);
        if(user && user.passcode !== 'YOUAREADMIN'){
            let admin = await Admin.create({
                name : user.name,
                email : user.email,
                password : user.password,
            });
            await admin.save();

            user.passcode = 'YOUAREADMIN';
            await user.save();
            res.redirect('/admin/dashboard');
        } else {
            // Handle the case where the user is not found or already an admin
            res.status(404).send('User not found or already an admin');
        }

    }catch(err){
        console.log(`Error in making User Admin ${err}`);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.removeAdmin = async (req, res) => {
    try {
        // Get the admin's ID from the request parameters
        const adminId = req.params.id;

        // Find the admin by ID
        const admin = await Admin.findById(adminId);

        // Find the user associated with the admin
        const user = await User.findOne({ email: admin.email });

        if (!admin || !user) {
            // Handle the case where the admin or associated user is not found
            return res.status(404).send('Admin not found');
        }

        // Revoke admin privileges
        user.passcode = "None";
        user.save();

        // Remove the admin's entry from the database
        await Admin.findByIdAndRemove(adminId);

        // Redirect to a different page or handle the success as needed
        return res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        // Redirect to a different page or handle errors as needed
        res.redirect('/admin/dashboard');
    }
};



module.exports.admin_sign_in = (req,res)=>{
    if(req.isAuthenticated() && req.user.passcode === 'YOUAREADMIN'){
        return res.redirect('/admin/profile');
    };
    return res.render('admin_sign_in',{
        title : 'Admin Sign-In'
    });
};

module.exports.create_admin_session = (req,res)=>{
    return res.redirect('/admin/home');
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

module.exports.request_review = async(req,res)=>{
    try{
        let employee = await User.find({});

        return res.render('ask-review',{
            title : 'Review',
            allEmployees : employee
        })
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.submitReviewRequest = async (req,res)=>{
    try{
        let review = await Review.create({
            reviewer : req.body.reviewer,
            employeeToReview : req.body.employeeToReview
        });
        if(!review){
            return res.redirect('back');
        }
        return res.redirect('/admin/dashboard');
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}