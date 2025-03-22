# CabinetFlow Technical Architecture

## System Components

### Backend Services

1. **Authentication Service**
   - User management and authentication
   - Role-based access control
   - Security and session management

2. **Document Management Service**
   - File upload and storage
   - Version control system
   - Metadata management
   - File association (hierarchical structure)

3. **QR Code Service**
   - QR code generation
   - Linking codes to database entries
   - Access control for QR codes

4. **Import Service**
   - File format parsers for various design software
   - Metadata extraction
   - Automated categorization
   - Batch processing

5. **Production Tracking Service**
   - Status management for parts/cabinets/projects
   - Progress reporting
   - Analytics and metrics

### Frontend Applications

1. **Admin Dashboard**
   - User management
   - System configuration
   - Import management
   - Project overview

2. **File Management Interface**
   - File upload and organization
   - Version control UI
   - QR code generation
   - Search and filtering

3. **Shop Floor Interface**
   - Mobile-responsive design
   - Workstation-specific views
   - Production status updates
   - Simple navigation

4. **Mobile Scanning App**
   - QR code scanning
   - Context-aware information display
   - Offline capabilities
   - Status updates

## Database Schema

```sql
-- Core tables from the baseline document
CREATE TABLE files (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'cad', 'cnc', 'cutlist', etc.
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL,
    is_current BOOLEAN DEFAULT TRUE
);

CREATE TABLE file_associations (
    association_id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(file_id),
    associated_with_id INTEGER NOT NULL,
    associated_with_type VARCHAR(50) NOT NULL, -- 'project', 'cabinet', 'part'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional tables
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cabinets (
    cabinet_id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(project_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parts (
    part_id SERIAL PRIMARY KEY,
    cabinet_id INTEGER REFERENCES cabinets(cabinet_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    material VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qr_codes (
    qr_id SERIAL PRIMARY KEY,
    target_id INTEGER NOT NULL,
    target_type VARCHAR(50) NOT NULL, -- 'project', 'cabinet', 'part'
    code_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Technology Stack

### Backend
- Node.js with Express or NestJS
- PostgreSQL database
- AWS S3 or similar for file storage
- Redis for caching

### Frontend
- React.js with Redux
- Material UI or Tailwind CSS
- Progressive Web App capabilities

### Mobile
- React Native for cross-platform mobile app
- Native camera integration for QR scanning

### DevOps
- Docker containerization
- CI/CD with GitHub Actions
- AWS or similar cloud hosting

## Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Role-based access control
   - Strong password policies

2. **Data Protection**
   - Encryption for files at rest
   - Secure transmission (HTTPS)
   - Regular security audits

3. **QR Code Security**
   - Time-limited access codes
   - Role-restricted content access
   - Audit logging for all scans