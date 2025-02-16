import { authenticator } from "otplib";
import moment from "moment";

export const generateOTP = (): {
  otpSecret: string;
  otp: string;
  otpExpiry: Date;
} => {
  authenticator.options = { step: 600 };

  const totpSecret = authenticator.generateSecret();
  const otp = authenticator.generate(totpSecret);
  const otpExpiry = moment().add(10, "minutes").toDate();

  return {
    otpSecret: totpSecret,
    otp,
    otpExpiry,
  };
};

export const validateOTP = (
  userOtp: string,
  userOtpSecret: string
): boolean => {
  authenticator.options = { step: 600 };
  return authenticator.check(userOtp, userOtpSecret);
};
