import { authenticator } from "otplib";
import nodemailer, { TransportOptions } from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USERNAME, OTP_SECRET_KEY } from "../config/env";

export const generateOTP = (): string => {
  return authenticator.generate(String(OTP_SECRET_KEY));
};

export const sendOTPEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const transporter = nodemailer.createTransport(<TransportOptions>{
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: String(EMAIL_USERNAME),
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It will expire in 30 seconds.`,
  });
};
