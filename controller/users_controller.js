const User=require('../models/user')

const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user',{
            title:'user profile',
            profile_user:user
        });
    })
    
}
module.exports.posts=function(req,res){
    
    return res.end('<h1>Posts Section</h1>')
}

//render the signup Page
module.exports.signUp=function(req,res){
  if(req.isAuthenticated())
  {
      return res.redirect('/users/profile')
  }
  return res.render('user_sign_up',{
      title:'codeial|signUp'
  })
  
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
  {
      return res.redirect('/users/profile')
  }
    return res.render('user_sign_in',{
        title:'codeial | Sign In'
    })
}

//getting the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('error in finding user signing up')
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("error in signing up the user");
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else
        {
            return res.redirect('back');
        }

    })
    
}

//getting the sign in data

module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    
    req.logout();
    req.flash('success','Logged Out Successfully');
    return res.redirect('/')
}

module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         if(err)
    //         {
    //             console.log("error");
    //             return;
    //         }
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     res.status(401).send('UnAuthorized');
    // }

    if(req.user.id==req.params.id)
    {
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******MULTER ERROR');
                }
                //console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..', user.avatar))
                      }

                    req.flash('success','File uploaded');
                    user.avatar=User.avatarPath + '/'+ req.file.filename;
                    console.log(User.avatarPath + '/'+ req.file.filename);

                }
                user.save();
                return res.redirect('back');
            })
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('UnAuthorized');
    }


}

module.exports.addFriend=function(req,res)
{
    
}