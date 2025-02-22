// swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Node.js app",
    },
    components: {
      schemas: {
        CreatePaymentIntentDTO: {
          type: "object",
          properties: {
            amount: {
              type: "number",
              description: "The amount to be paid",
              example: 1000,
            },
            currency: {
              type: "string",
              description: "The currency of the payment",
              example: "usd",
            },
            user: {
              type: "number",
              description: "User Id",
              example: 1,
            },
          },
          required: ["amount", "currency", "user"],
        },

        LoginDTO: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "user@example.com",
            },
            password: {
              type: "string",
              format: "password",
              description: "User's password",
              example: "password123",
            },
            recaptcha: {
              type: "string",
              description: "Google reCAPTCHA token",
              example: "03AGdBq27...",
            },
          },
          required: ["email", "password", "recaptcha"],
        },

        RegisterDTO: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "user@example.com",
            },
            firstName: {
              type: "string",
              description: "User's first name",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "User's last name",
              example: "Doe",
            },
            country: {
              type: "number",
              description: "User's country ID",
              example: 1,
            },
            marketing: {
              type: "boolean",
              description: "Whether the user consents to marketing emails",
              example: true,
            },
            profiling: {
              type: "boolean",
              description: "Whether the user consents to profiling",
              example: false,
            },
            recaptcha: {
              type: "string",
              description: "Google reCAPTCHA token",
              example: "03AGdBq27...",
            },
            role: {
              type: "string",
              description: "User's role",
              example: "user",
            },
          },
          required: [
            "email",
            "firstName",
            "lastName",
            "country",
            "recaptcha",
            "role",
          ],
        },

        ResetPasswordDTO: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Password reset token",
              example: "abc123",
            },
            newPassword: {
              type: "string",
              description: "New password",
              example: "newpassword123",
            },
          },
          required: ["token", "newPassword"],
        },

        VerifyOTPDTO: {
          type: "object",
          properties: {
            otp: {
              type: "string",
              description: "One-time password (OTP)",
              example: "123456",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "user@example.com",
            },
          },
          required: ["otp", "email"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["../routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
