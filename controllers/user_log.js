const User = require('../models/users');
const passport = require('../config/passport-local-strategy');
const Review = require('../models/review');

// module.exports.profile = async (req, res) => {
//     let user = await User.findById(req.params.id);
//     if(user){
//         return res.render('profile',{
//             title : `${req.user.name} Profile`,
//             user : user
//         })
//     }else{
//         return res.redirect('back');
//     }
// };

// module.exports.review = async (req, res) => {
    
// };
module.exports.home = (req,res)=>{
    return res.render('home',{
        title : 'Home'
    })
}

module.exports.profile = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let reviews = await Review.find({ reviewer: user._id });

        let employeeToReview = null;
        let reviewSubmitted = false;

        

        if (reviews.length > 0) {
            // Find the latest review with status 'Pending' (if any)
            let latestReview;
            for (const review of reviews) {
                if (review.status === 'Pending') {
                    latestReview = review;
                    break;
                }
            }
            if (latestReview && latestReview.status === 'Done') {
                reviewSubmitted = true;
            }

            if (latestReview) {
                employeeToReview = await User.findById(latestReview.employeeToReview);
            }
        }

        return res.render('profile', {
            title: `${user.name} Profile`,
            reviewer: user,
            employeeToReview: employeeToReview,
            user: user,
            reviewSubmitted: reviewSubmitted,
        });
    } catch (err) {
        console.log(`Error in rendering profile: ${err}`);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.review = async (req, res) => {
    let user = await User.findById(req.params.id);
    let myReviews = await Review.find({employeeToReview : user._id});
    
    return res.render('review',{
        title: 'Review',
        all_reviews : myReviews
    })
};


module.exports.createReview = async (req, res) => {
    try {
        let pendingReview = await Review.findOne({ employeeToReview: req.body.employeeToReview, status: 'Pending' });
        
        if (pendingReview) {
            // Update the 'Pending' review
            pendingReview.rating = req.body.rating;
            pendingReview.feedback = req.body.feedback;
            pendingReview.status = 'Done';
            await pendingReview.save();
        }
        // } else if(review && review.status === 'Pending') {
        //     review.rating = req.body.rating;
        //     review.feedback = req.body.feedback;
        //     review.status = 'Done';
        //     await review.save();
        // }

        // Redirect back to the profile page or any other appropriate page
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};





// module.exports.createReview = async (req,res)=>{
//     try{
//         // let review = await Review.create({
//         //     reviewer : req.body.reviewer,
//         //     employeeToReview: req.body.employeeToReview,
//         //     feedback : req.body.feedback,
//         //     rating : req.body.rating,
//         //     pending : 'Pending'
//         // });
//         let review = await Review.findOne({employeeToReview : req.body.employeeToReview});
//         if(review){
//             review.rating = req.body.rating;
//             review.feedback = req.body.feedback;
//             review.status = 'Done';
//             await review.save();
//             return res.redirect('back')
//         }
//     }catch(err){
//         console.log(err);
//         return res.status(500).send('Internal Server Error');
//     }
// };




module.exports.user_sign_up = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    };
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
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    };
    return res.render('user_sign_in',{
        title : 'User Sign-In'
    });
};

module.exports.create_session = (req,res)=>{
    return res.redirect('/user/home');
};

module.exports.destroy_session = (req,res)=>{
    req.logout((err) => {
        if (err) {
            console.log(`Error logging out: ${err}`);
            return res.redirect('/user/profile'); // Redirect to a different page or handle the error as needed
        }

        return res.redirect('/');
    });
};

