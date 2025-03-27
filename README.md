# EmployWise User Management System

A streamlined React application for user management built with React, TypeScript, and Tailwind CSS.

## Overview

This project is a user management system built with React that integrates with the Reqres API to perform basic user management functions including authentication, listing, editing, and deleting users.

## Features

- **Authentication**: Secure login system with token-based authentication
- **User Management**: 
  - View a paginated list of users
  - Edit user details
  - Delete users
- **Search**: Real-time search functionality to filter users
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **HTTP Requests**: Axios
- **Routing**: React Router
- **State Management**: React Context API
- **Form Validation**: React Hook Form with Zod
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd employwise-user-management
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

### Authentication

- Use the following credentials to log in:
  - Email: `eve.holt@reqres.in`
  - Password: `cityslicka`

### User Management

- After logging in, you'll be redirected to the Users page
- Browse through users with the pagination controls
- Search for specific users using the search bar
- Edit or delete users with the respective buttons

## API Integration

This application integrates with the Reqres API (https://reqres.in/) for all user management operations:

- **Authentication**: POST /api/login
- **List Users**: GET /api/users?page={page_number}
- **Edit User**: PUT /api/users/{id}
- **Delete User**: DELETE /api/users/{id}

## Project Structure

```
├── public/              # Static files
├── src/
│   ├── components/      # UI components
│   ├── context/         # React Context for state management
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
└── README.md            # Project documentation
```
