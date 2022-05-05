import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../MailAdapter';

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '88df4e0c211298',
		pass: 'eebdc0b7c48107'
	}
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {

		await transport.sendMail({
			from: 'Equipe Feedget <equipe@feedget.com>',
			to: 'Daniel Vidal danielsv465@hotmail.com',
			subject,
			html: body
		});
	}
}
