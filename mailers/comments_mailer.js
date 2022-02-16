const nodeMailer = require('../config/nodemailer');
const { getMaxListeners } = require('../models/user');
const User = require('../models/user');

exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from:'codeialwebsite30@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:"<h1>Your comment is posted</h1>"
    },
    (err,info)=>{
        if(err)
        {
            console.log('error in sending mail', err);
            return ;
        }
        console.log('Mail deliverd ',info);
        return;
    });
}