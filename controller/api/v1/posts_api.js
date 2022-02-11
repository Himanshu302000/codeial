const Post=require('../../../models/post')
const Comment=require('../../../models/comment')


module.exports.index=async function(req,res){
    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        return res.json(200,{
            message:"Lists of posts",
            posts:posts
        })
    }

     module.exports.destroy=function(req,res){
          Post.findById(req.params.id,function(err,post){

             if(err)
             {
                 return res.json(500,{
                     message:"Internal Server error"
                 })
             }
             //if(post.user==req.user.id){
                 post.remove();
                 //req.flash('success','Post deleted Successfully');
                 Comment.deleteMany({post:req.params.id});

                return res.json(200,{
                    message:"post and associated comments deleted successfully"
                })
        })
 }