const User = require('../models/users');


module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title : `User Profile`
    })
}


module.exports.user_sign_up = (req,res)=>{
    return res.render('user_sign_up',{
        title : 'User Sign-Up'
    });
};

module.exports.create_user = async (req,res)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.redirect('/user/sign-in');
        }else if(!user){
            await User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
            return res.redirect('/user/sign-in')
        }else{
            console.log('You are not authorise create this profile')
            return res.redirect('/admin/sign-up'); // Or some other appropriate action.
        }
    }catch(err){
        console.log(`Error in creating the user ${err}`);
        return res.status(500).send('Internal Server Error');
    }

}


module.exports.user_sign_in = (req,res)=>{
    return res.render('user_sign_in',{
        title : 'User Sign-In'
    });
};