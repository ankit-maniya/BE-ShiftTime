/*** Global ***/
import EmailService from '../global/EmailService.js';
import utils from '../global/index.js'

class EmailController {
    send = async (req, res) => {
        try {

            from = req.body.from;
            to = req.body.to;
            emailType = req.body.emailType;
            subject = req.body.subject;
            text = req.body.text;

            await EmailService.sendMail({
                from,
                to,
                subject,
                text
            })

            utils.sendSuccess(res, 200, { label: 'Email sent successfully!' })
        } catch (exception) {
            utils.sendError(res, 500)(exception)
        }
    }
}

export default new EmailController()