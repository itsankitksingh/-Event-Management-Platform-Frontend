# Event Management Platform

A real-time event management platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO.

## Features

- **Real-time Updates**: See live viewer count for events
- **User Authentication**: Register, login, and guest access
- **Event Management**: Create, view, and delete events
- **Search & Filter**: Find events by title, description, or category
- **Responsive Design**: Works on desktop and mobile devices
- **Guest Access**: View events without registration

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Material-UI (Component Library)
- Socket.IO Client (Real-time Updates)
- React Router (Navigation)
- Axios (API Requests)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Socket.IO (Real-time Communication)
- JWT (Authentication)
- Bcrypt (Password Hashing)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/event-management.git
cd event-management
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Create .env files

Backend (.env in server directory):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

Frontend (.env in client directory):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend application
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

### Guest Access
- Click "Continue as Guest" on the login page
- Browse and view events
- See real-time viewer counts

### Registered Users
- Create an account or login
- Create new events
- Delete own events
- View event details

## Project Structure

```
event-management/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── services/      # API and socket services
│       └── store/         # Redux store and slices
└── server/                # Node.js backend
    ├── middleware/        # Express middleware
    ├── models/           # MongoDB models
    └── routes/           # API routes
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create new event
- DELETE `/api/events/:id` - Delete event

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

