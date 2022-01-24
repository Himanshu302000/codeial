module.exports.profile=function(req,res){
    return res.render('user');
}
module.exports.posts=function(req,res){
    return res.end('<h1>Posts Section</h1>')
}