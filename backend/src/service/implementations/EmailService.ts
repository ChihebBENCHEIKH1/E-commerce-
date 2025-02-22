// emailService.ts
import nodemailer, { TransportOptions, Transporter } from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../../config/env";
import { IEmailService } from "../interfaces/IEmailService";

export class EmailService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
      throw new Error(
        "Email credentials are missing in environment variables."
      );
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  /**
   * Sends an email with optional attachments.
   * @param email - Recipient's email address.
   * @param subject - Email subject.
   * @param text - Plain text content.
   * @param html - HTML content.
   * @param attachments - Optional list of files to attach.
   */
  async sendEmail(
    email: string,
    subject: string,
    text: string,
    html: string,
    attachments?: { filename: string; path: string }[]
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `Motorcycle Xpert <${EMAIL_USERNAME}>`,
        to: email,
        subject,
        text,
        html,
        attachments,
      });
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
