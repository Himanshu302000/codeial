const nodeMailer = require('../config/nodemailer');
const { getMaxListeners } = require('../models/user');
const User = require('../models/user');

exports.newComment = (comment) => {
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'codeialwebsite30@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:htmlString
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