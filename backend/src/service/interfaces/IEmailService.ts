export interface IEmailService {
  sendEmail(
    email: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void>;
}
