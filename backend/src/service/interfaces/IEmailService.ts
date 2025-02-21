export interface IEmailService {
  sendEmail(
    email: string,
    subject: string,
    text: string,
    html: string,
    attachments?: { filename: string; path: string }[]
  ): Promise<void>;
}
