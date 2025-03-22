# Development Setup Guide

## Prerequisites

- Node.js (v16+)
- PostgreSQL (v13+)
- Git
- Docker (optional for containerization)

## Initial Setup

1. Clone the repository
   ```bash
   git clone https://github.com/eddygk/cabinet-flow.git
   cd cabinet-flow
   ```

2. Install dependencies
   ```bash
   # Backend dependencies
   cd src/backend
   npm install
   
   # Frontend/PWA dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   Create `.env` files in both the backend and frontend directories based on the provided `.env.example` files.

4. Set up the database
   ```bash
   # Create the database
   createdb cabinetflow
   
   # Run migrations (once backend is set up)
   cd src/backend
   npm run migrate
   ```

## Running the Development Servers

### Backend
```bash
cd src/backend
npm run dev
```

### Frontend/PWA
```bash
cd src/frontend
npm run start
```

## Project Structure

The project follows a structured approach with separate packages for backend and frontend applications.

### Backend Structure
```
src/backend/
├── src/
│   ├── config/         # Configuration for DB, auth, etc.
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── parsers/        # File format parsers
├── migrations/         # Database migrations
├── tests/              # Test files
├── package.json
└── tsconfig.json
```

### Frontend/PWA Structure
```
src/frontend/
├── public/
│   ├── manifest.json   # PWA manifest
│   ├── service-worker.js # Service worker for offline support
│   └── icons/          # PWA icons
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── file-manager/ # File management pages
│   │   └── shop-floor/ # Shop floor interface pages
│   ├── services/       # API service calls
│   ├── store/          # Redux store
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
│       └── parsers/    # Client-side format viewers
├── package.json
└── tsconfig.json
```

## Key Development Features

### Progressive Web App
The frontend is developed as a Progressive Web App (PWA) with:
- Service workers for offline capabilities
- Installable on various devices
- Responsive design for all screen sizes
- IndexedDB for local data storage

### Backend API
The backend provides a RESTful API with:
- JWT authentication
- File upload and management
- QR code generation
- Data synchronization endpoints
- File format parsing and processing

## Testing

```bash
# Run backend tests
cd src/backend
npm test

# Run frontend tests
cd src/frontend
npm test
```

## Linting and Formatting

```bash
# Lint and fix backend code
cd src/backend
npm run lint

# Lint and fix frontend code
cd src/frontend
npm run lint
```

## Building for Production

```bash
# Build backend
cd src/backend
npm run build

# Build frontend
cd src/frontend
npm run build
```

## Docker Setup

A Docker setup is provided for easy development and deployment:

```bash
# Start the development environment
docker-compose up

# Start production environment
docker-compose -f docker-compose.prod.yml up
```

## QR Code Testing

For testing QR code scanning without physical printouts:
1. Generate QR codes in development mode
2. Access them via the admin interface
3. Scan them using your device's camera or a built-in test scanner

## Offline Development Testing

To test offline capabilities:
1. Enable offline mode in the browser's developer tools
2. Use the application normally
3. Check IndexedDB storage and service worker activity in dev tools
4. Re-enable connectivity to test synchronization