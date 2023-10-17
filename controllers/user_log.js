
module.exports.user_sign_up = (req,res)=>{
    return res.render('user_sign_up',{
        title : 'User Sign-Up'
    });
};

module.exports.user_sign_in = (req,res)=>{
    return res.render('user_sign_in',{
        title : 'User Sign-In'
    });
};