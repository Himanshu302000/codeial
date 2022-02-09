const Post=require('../models/post')
const User=require('../models/user')
module.exports.home=async function(req,res){
    //res.end('<h1>express home is setup</h1>')

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial|home",
    //         posts:posts
    //     })
    // })

    //populate the user of each post
    try{

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })

    let users=await User.find({});

        return res.render('home',{
            title:"Codeial|home",
            posts:posts,
            all_user:users
        });

    }
    catch(err){
        console.log(err);
    }
}