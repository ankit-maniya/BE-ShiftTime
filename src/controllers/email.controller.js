/*** Global ***/
import EmailService from '../global/EmailService.js';
import EmailTempletes from '../global/EmailTempletes.js';
import { config } from '../configs/index.js';
import utils from '../global/index.js'

class EmailController {
    send = async (req, res) => {
        try {

            from = req.body.from;
            to = req.body.to;
            emailType = req.body.emailType;
            subject = req.body.subject;
            text = req.body.text;
            html = req.body.html;

            await EmailService.sendMail({
                from,
                to,
                subject,
                text,
                html
            })

            utils.sendSuccess(res, 200, { message: 'Email sent successfully!' })
        } catch (exception) {
            utils.sendError(res, 500)(exception)
        }
    }

    sendShiftCreatedEmail = async (req, res) => {
        try {
            const { reciverEmail, subject, description } = req.body
            const html = await EmailTempletes.createShiftIsCreatedEmail({ info: { subject, description }});

            await EmailService.sendMail({
                from: config.EMAIL_USER,
                to: reciverEmail,
                subject: subject || "Shift has been created",
                html
            })

            utils.sendSuccess(res, 200, { message: 'Email sent successfully!' })
        } catch (exception) {
            utils.sendError(res, 500)(exception)
        }
    }

    sendAvailabilityStatusChangedEmail = async (req, res) => {
        try {
            const { reciverEmail, subject } = req.body
            const html = EmailTempletes.createAvailabilityStatusChangeEmail({});

            await EmailService.sendMail({
                from: config.EMAIL_USER,
                to: reciverEmail,
                subject: subject,
                html
            })

            utils.sendSuccess(res, 200, { message: 'Email sent successfully!' })
        } catch (exception) {
            utils.sendError(res, 500)(exception)
        }
    }

    sendBookOffStatusChangedEmail = async (req, res) => {
        try {
            const { reciverEmail, subject } = req.body
            const html = EmailTempletes.createBookoffStatusChangeEmail({});

            await EmailService.sendMail({
                from: config.EMAIL_USER,
                to: reciverEmail,
                subject: subject,
                html
            })

            utils.sendSuccess(res, 200, { message: 'Email sent successfully!' })
        } catch (exception) {
            utils.sendError(res, 500)(exception)
        }
    }
}

export default new EmailController()