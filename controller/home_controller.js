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
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },
        populate:{
            path:'likes'
        }
    }).populate('likes')

    let users=await User.find({});
    let friends = [];
    if(req.isAuthenticated())
    {
         friends=await User.findById(req.user.id).populate({
            path:'friends',
            populate:{
                path:'from_user'
            },
            populate:{
                path:'to_user'
            }
        })
    }

        return res.render('home',{
            title:"Codeial|home",
            posts:posts,
            all_user:users,
            friends:friends.friends
        });

    }
    catch(err){
        console.log(err);
    }
}