module.exports.profile=function(req,res){
    return res.render('user',{
        title:'user profile'
    });
}
module.exports.posts=function(req,res){
    return res.end('<h1>Posts Section</h1>')
}