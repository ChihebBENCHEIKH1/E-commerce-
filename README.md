# Motorcycle Dealership App

A full-stack application built with Node.js, TypeScript, and React designed to showcase best practices in scalable web development. This project simulates a motorcycle dealership platform, featuring secure user authentication, payment processing, error tracking, and robust DevOps integration.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Motorcycle Dealership app is designed as a modern full-stack solution for browsing and purchasing motorcycles. It leverages advanced backend patterns, secure authentication, payment integration, and performance optimizations on the frontend to provide a production-ready experience.

## Features

### Backend
- **API & Architecture**: RESTful API built with Node.js and TypeScript using clean architecture principles.
- **Dependency Injection**: Utilizes Inversify for managing dependencies.
- **Authentication & Security**: 
  - OTP-based sign-up and email password reset.
  - reCAPTCHA to protect against spam.
- **Payment Integration**: 
  - Stripe integration with webhooks for automated invoicing.
- **Monitoring**: Integrated Sentry for real-time error tracking.
- **Database Management**: 
  - Repository pattern and initial database migrations provided.
- **Testing**: Includes backend tests to ensure API reliability.

### Frontend
- **Modern UI**: Built with React, featuring lazy loading and code splitting for optimal performance.
- **State Management**: Uses Redux Toolkit for predictable state handling.
- **Routing**: Implements an application router for smooth navigation.
- **User Interface**: 
  - Material-UI (MUI) for a polished look.
  - Custom form hooks for efficient form management.
- **Additional Features**: Pagination, search, and integration with backend endpoints.
- **Testing**: End-to-end UI tests implemented with Cypress.
- **DevOps**: 
  - Docker configurations for both frontend and backend.
  - Nginx for serving the frontend.

### DevOps & CI/CD
- **Containerization**: Dockerfiles for both backend and frontend.
- **Orchestration**: Docker Compose setup to run the complete application.
- **CI/CD Pipeline**: GitHub Actions configured for automated testing and deployment.
- **Project Management**: Agile practices managed via JIRA with a structured Git branching strategy.

## Tech Stack

- **Backend**: Node.js, TypeScript, Express (or a similar framework), Inversify, Stripe, Sentry.
- **Frontend**: React, Redux Toolkit, Material-UI, React Router, Cypress.
- **DevOps**: Docker, Docker Compose, Nginx, GitHub Actions.
- **Database**: (Your chosen DB, e.g., MongoDB or PostgreSQL with migration scripts).

## Installation

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ChihebBENCHEIKH1/Motorcyle-dealership.git
   cd motorcycle-dealership/backend
    ```
2. **Install Dependencies:**
   ```bash
   npm install
    ```
3. **Configure Environment Variables:**
  - Create a .env file based on .env.example.
  - Set your database credentials, Stripe keys, Sentry DSN, etc.
4. **Run Database Migrations:**
   ```bash
   npm run migrate
    ```
5. **Start the Server:**
   ```bash
   npm run dev
    ```
### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../frontend
    ```
2. **Install Dependencies:**
   ```bash
   npm install
    ```
3. **Configure Environment Variables:**
  - Create a .env file based on .env.example.
  - Set your database credentials, Stripe keys, Sentry DSN, etc.
4. **Start the Server:**
   ```bash
   npm run dev
    ```
## Testing

### Backend Tests

1. **Open Cypress GUI:**
   ```bash
   npm run test
    ```
### Frontend Tests (Cypress)

1. **Open Cypress GUI:**
   ```bash
   npx cypress open
    ```
## Deployment

The project includes Docker configurations for seamless deployment. To run both backend and frontend services using Docker Compose, execute:
 ```bash
   docker-compose up --build
    ```
## Folder Structure
### Backend

backend/
├── src/
│   ├── config/          # Application configuration (e.g., DB, environment settings)
│   ├── controllers/     # API route controllers
│   ├── service/         # Business logic and service layer
│   ├── models/          # Data models/schemas
│   ├── dto/             # Data Transfer Objects for incoming requests
│   ├── resource/        # Response formatting and transformation
│   ├── repository/      # Data access layer (repositories)
│   ├── utils/           # Utility functions and helpers
│   ├── route/           # Route definitions
│   ├── scripts/         # Example scripts (e.g., initial DB migrations)
│   └── index.ts         # Application entry point
└── test/                # Backend tests

### Frontend

frontend/
├── assets/              # Static assets (images, fonts, etc.)
├── config/              # App configuration and environment variables
├── features/            # Feature-based components and pages
├── common/              # Shared components, hooks, and utilities
├── services/            # API calls and business logic services
├── router/              # Application routing setup
├── store/               # Redux state management
└── utils/               # Utility functions and helper modules

## Contributing

Contributions are welcome! If you’d like to contribute, please follow these steps:

 1. Fork the repository.
 2. Create a new branch for your feature or fix.
 3. Commit your changes and open a pull request.
 4. Ensure your code adheres to the project’s coding standards and includes relevant tests.

## License
This project is licensed under the MIT License.
