const Post=require('../models/post')
const Comment=require('../models/comment')

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

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
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