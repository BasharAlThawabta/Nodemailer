const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
const encodeUrl = bodyParser.urlencoded({ extended: false });
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const userEmail = (req, res, next) => {
	res.locals.email = "YourEmail@gmail.com"
	next();
}

app.use(userEmail)


app.get('/', (req, res)=>{
	

res.render(path.join(__dirname, '/views/contact.ejs'));
})

app.post('/', encodeUrl, (req, res) => {
    const to = req.body.to.split(','); 
    const subject = req.body.subject;
    const text = req.body.text;
    const html = req.body.html;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Youremail',
            pass: 'Your APP PASS',
        },
    });

    const mailOptions = {
        from: '"Yourname" <YourEmail>',
        to: to.join(', '),
        subject: subject,
        text: text,
        html: html,
    };

    transporter.sendMail(mailOptions, function (err, email) {
        if (err) {
            console.log(err);
            res.send('An error occurred while sending the email.');
        } else {
            res.redirect('/');
        }
    });
});


app.listen(3000, function(){
	
	console.log('Running')
	
})
