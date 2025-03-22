# CabinetFlow

A document management system with QR code integration for custom cabinet makers.

## Overview

CabinetFlow is designed as a complementary solution to existing cabinet design software, focusing on streamlining file management, shop floor access to manufacturing data, and production tracking. Rather than competing with visualization tools, CabinetFlow serves as the critical bridge between design software and shop floor execution.

## Key Features

- Document management with version control for manufacturing files
- QR code generation and scanning for shop floor access to documents
- Import interfaces for popular cabinet design software
- Workstation-specific views (CNC, cutting, assembly)
- Production status tracking
- Progressive Web App with offline capabilities
- Support for standard file formats (CSV, DXF, G-code, etc.)

## The Problem We Solve

Custom cabinet shops often struggle with the gap between their design software and shop floor execution:

- Files exported from design software are difficult to manage and access
- Shop floor workers need to leave workstations to find information
- Version control for manufacturing files is often manual or nonexistent
- Production tracking is typically paper-based and error-prone

CabinetFlow bridges this gap by providing an organized document management system with shop-floor-friendly access through QR codes. This improves production efficiency, reduces errors, and streamlines the manufacturing process.

## Technology Approach

- **Progressive Web App**: Works on any device, with offline capabilities
- **QR Code Integration**: Scan QR codes to access relevant manufacturing files
- **Standard Format Support**: Works with common file formats from most design software
- **Hierarchical Organization**: Organizes files by project, cabinet, and component
- **Workstation-Specific Views**: Shows relevant information based on the production stage

## Project Structure

- `/docs` - Project documentation
- `/src` - Source code
  - `/backend` - Server-side code (Node.js, Express, TypeScript)
  - `/frontend` - Client-side code (React, Progressive Web App)
- `/tests` - Test suite

## Getting Started

See the [Development Setup](./docs/development-setup.md) guide to get started with development.

## Technical Architecture

For detailed information about the system architecture, database schema, and technical approach, see the [Technical Architecture](./docs/technical-architecture.md) document.

## Project Plan

For information about the implementation timeline and features, see the [Project Plan](./docs/project-plan.md) document.

## License

Private - All rights reserved