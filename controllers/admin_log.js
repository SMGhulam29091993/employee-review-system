
module.exports.admin_sign_up = (req,res)=>{
    return res.render('admin_sign_up',{
        title : 'Admin Sign-Up'
    });
};

module.exports.admin_sign_in = (req,res)=>{
    return res.render('admin_sign_in',{
        title : 'Admin Sign-In'
    });
};