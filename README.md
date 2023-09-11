# Outliers Frontend

This document will guide you through the setup and installation process for the Outliers Frontend application. Follow these steps to get the project up and running on your local development environment.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js (with npm)

## Getting Started

These instructions will guide you through cloning the repository and setting up the project on your local development environment.

### Installation

1. **Clone the Repository**:

   Clone the Outliers Frontend project repository from GitHub using the following command:

   ```bash
   git clone https://github.com/Veeresh-Halli/outliers-frontend.git
   ```

2. **Navigate to the Project Directory**:

   Change your working directory to the project folder:

   ```bash
   cd outliers-frontend
   ```

3. **Install Dependencies**:

   Install the project's dependencies using npm:

   ```bash
   npm install
   ```

4. **Create an Environment File (.env)**:

   In the project directory, create a file named .env and add the following environment variables:

   ```bash
   REACT_APP_LOGIN_BASE_URL="http://127.0.0.1:8000/api/auth"
   REACT_APP_TASKS_BASE_URL="http://127.0.0.1:8000/api/"
   REACT_APP_REDIRECT_LOGIN_URL="http://127.0.0.1:3000/login"
   ```

5. **Run Project**:

   Now that you've cloned the repository and configured the environment variables, you can start the project:

   ```bash
   npm start
   ```

The development server should start, and you can access the application at `http://localhost:3000/`.
