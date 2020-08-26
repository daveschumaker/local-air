import nodemailer from 'nodemailer';
import config from '../../config';

const { enabled, EMAIL_TO, EMAIL_FROM, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = config.email;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASSWORD
    }
});

const initMailOptions = {
    from: `Air Quality Alert <${EMAIL_FROM}>`,
    to: EMAIL_TO,
    subject: '',
    html: '' // email body
};

const mailer = {
    send({ subject, body } = {}) {
        if (!enabled) {
            return;
        }

        let mailOptions = Object.assign({}, initMailOptions);

        mailOptions.subject = subject || 'Air Quality Alert';
        mailOptions.html = `${body}`;

        transporter.sendMail(mailOptions, error => {
            if (error) {
                console.log('Error: Unable to send email');
                console.log(error);
            }
        });
    }
};

export default mailer;
