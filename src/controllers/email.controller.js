/*** Global ***/
import EmailService from '../global/EmailService.js';
import EmailTempletes from '../global/EmailTempletes.js';
import { config } from '../configs/index.js';
import utils from '../global/index.js'
import { ShiftStore } from '../stores/index.js';

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
            const html = await EmailTempletes.createShiftIsCreatedEmail({ info: { subject, description } });

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

    sendShiftListToEmployee = async (req, res) => {
        try {

            const startDate = req.body.startDate;
            const endDate = req.body.endDate;

            const whatToMatch = {
                $match: {
                    start_date: {
                        $gte: new Date(startDate),
                    },
                    end_date: {
                        $lte: new Date(endDate)
                    },
                    isPublised: true,
                }
            }

            const wrokRoleLookUp = {
                $lookup: {
                    from: 'categories',
                    localField: 'workRole',
                    foreignField: '_id',
                    as: 'workRole'
                }
            }

            const usersLookUp = {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    pipeline: [
                        wrokRoleLookUp,
                        {
                            $unwind: '$workRole'
                        }
                    ],
                    as: 'user'
                }
            }

            const aggregate = [];

            if (whatToMatch) {
                aggregate.push(whatToMatch);
            }

            aggregate.push({
                $sort: {
                    start_date: 1
                }
            });

            if (usersLookUp) {
                aggregate.push(usersLookUp);
                aggregate.push({ $unwind: '$user' });
            }

            const groupByEmployee = {
                $group: {
                    _id: {
                        wrokingRole: "$user.workRole.category",
                        userid: "$user._id",
                        firstName: "$user.firstName",
                        email: "$user.email",
                    },
                    shifts: {
                        $push: {
                            firstName: "$user.firstName",
                            start_date: "$start_date",
                            end_date: "$end_date",
                            duration: "$duration",
                            notes: "$notes",
                            _id: "$_id"
                        }
                    }
                }
            }

            aggregate.push(groupByEmployee);

            const data = await ShiftStore.getAllByAggregate(aggregate);

            if (data.length == 0) {
                return utils.sendSuccess(res, 200, { message: 'No shifts found!' })
            }

            const emails = [];

            for (let i = 0; i < data.length; i++) {
                const employee = data[i];
                const title = `${employee._id.firstName}, This week shifts!`;
                emails.push(employee._id.email);

                const html = await EmailTempletes.createShiftListToEmployeeEmail({ info: { title, shifts: employee.shifts } });

                await EmailService.sendMail({
                    from: config.EMAIL_USER,
                    // to: "ankitmaniya7450@gmail.com",
                    to: employee._id.email,
                    subject: `${employee._id.firstName} Shifts`,
                    html
                })
            }

            utils.sendSuccess(res, 200, { message: 'Email sent successfully!', emails })
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