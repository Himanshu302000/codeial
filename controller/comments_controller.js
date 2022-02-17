
const Comment=require('../models/comment')
const Post=require('../models/post')
const User = require('../models/user')
const commentsMailer=require('../mailers/comments_mailer');
const Like=require('../models/like')

module.exports.create=async function(req,res){
    try{
        let post= await Post.findById(req.body.post);
    
    let comment=await Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id});

        await post.comments.push(comment);
        
        await post.save();
        console.log(comment.user)
        comment=await comment.populate('user','name email');
        commentsMailer.newComment(comment);
        req.flash('success','Commented posted successfuly')
        return res.redirect('/');
    }
    catch(err){
        req.flash('error','Commented cannot pe posted')
        console.log(err);
    }
}

module.exports.destroy=async function(req,res){
    try{

    let comment=await Comment.findById(req.params.id);

    
    if(comment.user==req.user.id){
        let postId=comment.post;

        comment.remove();

        await Like.deleteMany({likeable:comment._id,onModel:'Comment'})

        Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
            return res.redirect('back');
        })
        req.flash('success','Commented deleted successfuly')
    }
    else
    {
        req.flash('error','Commented cannot be')
        return res.redirect('back');
    }

    }
    catch(err){
        console.log(err);
    }
}