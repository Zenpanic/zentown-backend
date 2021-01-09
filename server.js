const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { json } = require('express');

require('dotenv').config();

const botmail = process.env.YAHOO_LOGIN;


const app = express();

app.use(cors());
app.use(express.json());

app.post('/sendMessage', (req, res) => {

    const { email, name, message } = req.body;

    if (email && message && name) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            service: 'yahoo',
            secure: true,
            port: 465,
            auth: {
                user: botmail,
                pass: process.env.YAHOO_PASSWORD
            }
        });

        const mailOptions = {
            from: "'Bot ZenTown' <" + botmail + ">",
            to: process.env.RECEIVER,
            subject: 'Nouveau message !',
            text: 'From: ' + email + '\n' + 'Message: ' + message
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    res.sendStatus(200);

})

app.listen(process.env.PORT);