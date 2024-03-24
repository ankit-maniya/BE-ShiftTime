import nodemailer from "nodemailer";
import { config } from "../configs/index.js";

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.EMAIL_HOST,
            port: config.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.EMAIL_USER, // generated ethereal user
                pass: config.EMAIL_PASSWORD, // generated ethereal password
            },
        })
    }

    sendMail = async (mailOptions) => {
        const { from, to, subject, text, html } = mailOptions;
        const info = await this.transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html
        });

        console.log("<======== mail send successfully! ==========>");
    }
}

export default new EmailService();