module.exports.home=function(req,res){
    //res.end('<h1>express home is setup</h1>')
    return res.render('home',{
        title:"home"
    })
}