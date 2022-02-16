const nodemailer=require('nodemailer');
const ejs = require('ejs');
const path = require('path');


//this is the path which sends the email to others
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'codeialwebsite30@gmail.com',
        pass:'Codeial1212@'
    }
});

//render template define when ever we are sending the html email where the file is there in the views folder
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err)
            {
                console.log("error in rendering template")
                return;
            }
            mailHTML = template;
        }
        
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}