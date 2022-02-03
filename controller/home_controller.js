const Post=require('../models/post')
module.exports.home=function(req,res){
    //res.end('<h1>express home is setup</h1>')

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial|home",
    //         posts:posts
    //     })
    // })

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,post){
        return res.render('home',{
            title:"Codeial|home",
            posts:post
        })
    })

}