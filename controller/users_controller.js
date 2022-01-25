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
    return res.render('user_sign_up',{
        title:'codeial | Sign Up'
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'codeial | Sign In'
    })
}

//getting the sign up data
module.exports.create=function(req,res){
    //toDo later
}

//getting the sign in data

module.exports.createSession=function(req,res){
    //toDo Later
}