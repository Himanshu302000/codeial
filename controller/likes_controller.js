const Like= require('../models/like');
const Post= require('../models/post');
const Comment= require('../models/comment');

module.exports.toggleLike=async function(req,res)
{
    try{


        //likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted=false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else
        {
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        //if a like already exists hten delete it else make a new like
        if(existingLike)
        {
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted=true;
        }
        // if like doenot exist then make one
        else
        {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel:req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
         return res.json(200,{
            message :"Request Successfull",
            data: {
                deleted:deleted,
            }
        })
        //return res.redirect('back')
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }
}

