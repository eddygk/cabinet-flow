# Multi-stage build for CabinetFlow

# Backend build stage
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY src/backend/package*.json ./
RUN npm ci
COPY src/backend/ ./
RUN npm run build

# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY src/frontend/package*.json ./
RUN npm ci
COPY src/frontend/ ./
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies for backend
COPY src/backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Copy built assets
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Set up environment
EXPOSE 5000
WORKDIR /app/backend

# Start the server
CMD ["node", "dist/index.js"]