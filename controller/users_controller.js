const User=require('../models/user')
module.exports.profile=function(req,res){
    return res.render('user',{
        title:'user profile'
    });
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
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/')
}