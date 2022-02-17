const Post=require('../models/post')
const Comment=require('../models/comment')
const Like = require('../models/like')

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating a Post");
            return;
        }
        //console.log(post)
        req.flash('success','Post created Successfully');
        return res.redirect('back');
    })
}

module.exports.destroy=async function(req,res){
    await Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){

            //change :: delete the associated likes for the post and all its comments likes too

             Like.deleteMany({likeable:post,onModel:'Post'});
             Like.deleteMany({_id:{$in:post.comments}});

            post.remove();
            req.flash('success','Post deleted Successfully');
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });

        }
        else{
            req.flash('error','You cannot deleted Successfully');
            return res.redirect('back');
        }
    })
}