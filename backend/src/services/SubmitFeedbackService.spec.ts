import { SubmitFeedbackService } from './SubmitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'This is a test comment',
			screenshot: 'data:image/png;base64,test.jpg'
		})).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not be able to submit feedback without type', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'This is a test comment',
			screenshot: 'data:image/png;base64,test.jpg'
		})).rejects.toThrow();
	});

	it('should not be able to submit feedback without comment', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			screenshot: 'data:image/png;base64,test.jpg'
		})).rejects.toThrow();
	});

	it('should not be able to submit feedback an invalid screenshot', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'This is a test comment',
			screenshot: 'test.jpg'
		})).rejects.toThrow();
	});
});
