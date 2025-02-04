import axios from "axios";

export const captchaHelper = {
  async verifyCaptcha(
    captchaResponse: string,
    secret: string
  ): Promise<boolean> {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const params = { secret, response: captchaResponse };

    try {
      const result = await axios.post(verifyUrl, null, { params });
      return result.data.success;
    } catch (error) {
      console.error("CAPTCHA verification failed", error);
      return false;
    }
  },
};
