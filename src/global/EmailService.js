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
        const { from, to, subject, text } = mailOptions;
        const info = await this.transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        });

        console.log("mail send successfully!", info);
    }
}

export default new EmailService();