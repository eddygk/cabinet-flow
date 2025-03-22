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
   
   # Frontend dependencies
   cd ../frontend
   npm install
   
   # Mobile app dependencies
   cd ../mobile
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

### Frontend
```bash
cd src/frontend
npm run start
```

### Mobile App
```bash
cd src/mobile
npm run start
```

## Project Structure

The project follows a monorepo structure with separate packages for backend, frontend, and mobile applications.

### Backend Structure
```
src/backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── package.json
└── tsconfig.json
```

### Frontend Structure
```
src/frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
├── package.json
└── tsconfig.json
```

### Mobile App Structure
```
src/mobile/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── screens/
│   ├── services/
│   └── utils/
├── package.json
└── tsconfig.json
```

## Testing

```bash
# Run backend tests
cd src/backend
npm test

# Run frontend tests
cd src/frontend
npm test

# Run mobile app tests
cd src/mobile
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

# Lint and fix mobile app code
cd src/mobile
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

# Build mobile app
cd src/mobile
npm run build
```