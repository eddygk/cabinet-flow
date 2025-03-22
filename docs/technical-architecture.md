# CabinetFlow Technical Architecture

## System Components

### Backend Services

1. **Authentication Service**
   - User management and authentication
   - Role-based access control
   - Shop-floor friendly authentication (QR badge scanning)
   - Security and session management

2. **Document Management Service**
   - File upload and storage
   - Version control system
   - Metadata management and extraction
   - File association (hierarchical structure)
   - Format-specific parsing

3. **QR Code Service**
   - QR code generation with security features
   - Time-limited access codes
   - Linking codes to database entries
   - Access control for QR codes
   - Scan logging and analytics

4. **Import Service**
   - Standard file format parsers (CSV, DXF, G-code, etc.)
   - Metadata extraction from design files
   - Automated categorization
   - Batch processing
   - Import validation

5. **Production Tracking Service**
   - Status management for parts/cabinets/projects
   - Progress reporting
   - Material tracking
   - Analytics and metrics
   - Issue documentation

### Frontend Applications

1. **Admin Dashboard**
   - User management
   - System configuration
   - Import management
   - Project overview
   - Analytics and reporting

2. **File Management Interface**
   - File upload and organization
   - Version control UI
   - QR code generation
   - Search and filtering
   - Metadata management

3. **Shop Floor Interface (Progressive Web App)**
   - Mobile-responsive design
   - Workstation-specific views
   - Production status updates
   - Simple navigation
   - Offline capabilities
   - Touch-optimized interface

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
    is_current BOOLEAN DEFAULT TRUE,
    sync_status VARCHAR(50) DEFAULT 'synced'
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
    expires_at TIMESTAMP,
    last_scanned_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- New tables for enhanced functionality
CREATE TABLE file_formats (
    format_id SERIAL PRIMARY KEY,
    format_name VARCHAR(50) NOT NULL,
    format_extension VARCHAR(10) NOT NULL,
    parser_type VARCHAR(50) NOT NULL
);

CREATE TABLE workstations (
    workstation_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'cnc', 'saw', 'assembly', etc.
    description TEXT
);

CREATE TABLE file_metadata (
    metadata_id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(file_id),
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE scan_logs (
    log_id SERIAL PRIMARY KEY,
    qr_id INTEGER REFERENCES qr_codes(qr_id),
    user_id INTEGER NOT NULL,
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    workstation_id INTEGER REFERENCES workstations(workstation_id),
    ip_address VARCHAR(50),
    device_info TEXT
);

CREATE TABLE offline_sync_logs (
    sync_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    items_synced INTEGER DEFAULT 0,
    error_message TEXT
);
```

## Technology Stack

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- AWS S3 or similar for file storage
- Redis for caching

### Frontend
- React.js with TypeScript
- Redux for state management
- Material UI for component library
- Progressive Web App capabilities
- Service workers for offline support

### File Format Support
- CSV/Excel: SheetJS for parsing
- DXF: dxf-parser for CAD file import
- G-code: Custom parser for CNC instructions
- MPR/WoodWOP: Specialized parsers for common formats

### DevOps
- Docker containerization
- CI/CD with GitHub Actions
- AWS or similar cloud hosting

## Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Role-based access control
   - Shop-floor friendly authentication options
   - Strong password policies
   - Rate-limiting and brute force protection

2. **Data Protection**
   - Encryption for files at rest
   - Secure transmission (HTTPS)
   - Regular security audits
   - Data backup and recovery
   - Compliance with industry standards

3. **QR Code Security**
   - Time-limited access codes (24-hour expiration default)
   - Role-restricted content access
   - Regeneration capabilities for expired codes
   - Audit logging for all scans
   - Access control based on workstation and role

4. **Offline Security**
   - Encrypted local storage
   - Automatic purging of sensitive data
   - Synchronization validation
   - Device authentication

## Progressive Web App Architecture

1. **Core PWA Features**
   - Service workers for offline capabilities
   - Manifest for installation
   - Responsive design for all devices
   - Push notifications for status updates
   - Background sync for offline changes

2. **Offline Support**
   - IndexedDB for local data storage
   - Prioritized data for offline access
   - Queue system for offline actions
   - Conflict resolution on reconnection
   - Bandwidth-conscious synchronization

3. **Shop Floor Optimizations**
   - Touch-friendly interfaces
   - High-contrast display options
   - Large buttons and clear typography
   - Minimal text input requirements
   - Voice input options where appropriate

## Integration Architecture

1. **API First Design**
   - RESTful API with OpenAPI specification
   - Versioned endpoints
   - Rate limiting and throttling
   - Comprehensive documentation
   - SDK for common integrations

2. **Business System Connections**
   - Standardized data exports
   - Webhook support for real-time updates
   - Scheduled synchronization options
   - Transaction logging and audit trails

3. **CNC Integration**
   - Direct file transfer capabilities
   - Machine-specific format transformations
   - Status feedback channels
   - Production validation checks