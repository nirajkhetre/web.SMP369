# 369-MC SMP Minecraft Server Website

## Overview

This is a promotional website for the 369-MC SMP Minecraft server. The application serves as a landing page and information hub for potential players, providing server details, connection information, and community features. Built as a full-stack TypeScript application, it features a gaming-inspired dark theme with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Implements shadcn/ui components built on top of Radix UI primitives. This provides accessible, customizable components following the "New York" style variant. Components are located in `client/src/components/ui/` and use Tailwind CSS for styling.

**Routing**: Uses Wouter for lightweight client-side routing. Currently implements two routes:
- Home page (`/`) - Main landing page
- 404 page for undefined routes

**State Management**: React Query (TanStack Query) for server state management with custom query client configuration. Queries are configured to never refetch automatically, treating data as always fresh.

**Design System**: Gaming-inspired dark theme with:
- Dark charcoal backgrounds (#0a0a0a, #141414, #1a1a1a)
- Vibrant green primary accent (#00ff88, #10b981) - Minecraft-inspired
- Purple secondary accent (#a855f7, #8b5cf6) - Nether portal theme
- Gold highlights for premium elements
- Custom typography combining gaming fonts (Press Start 2P, Rajdhana) with readable sans-serif (Inter, Roboto)

**Styling Approach**: Tailwind CSS with extensive customization via CSS variables. The design system is fully defined in HSL color space for easy theme manipulation. Custom utility classes handle elevation effects (`hover-elevate`, `active-elevate-2`).

### Backend Architecture

**Framework**: Express.js server with TypeScript, serving both API endpoints and static files.

**Server Structure**:
- `server/index.ts` - Main server entry point with middleware setup and logging
- `server/routes.ts` - API route definitions
- `server/static.ts` - Static file serving for production builds
- `server/vite.ts` - Development server integration with Vite HMR
- `server/storage.ts` - Data persistence layer abstraction

**API Endpoints**:
- `GET /api/server-info` - Returns comprehensive server information (name, IP, features, capacity, etc.)
- `GET /api/server-status` - Returns real-time server status (online/offline, player count)

**Logging**: Custom request logging middleware that tracks request method, path, status code, duration, and response data for API calls.

**Development Mode**: Integrates Vite middleware for hot module replacement during development. Production mode serves pre-built static files.

### Data Storage Solutions

**Current Implementation**: In-memory storage using a Map-based system (`MemStorage` class). Implements an `IStorage` interface for potential future database integration.

**Schema Definition**: Uses Drizzle ORM for type-safe schema definitions even though the current implementation doesn't use a database. The schema defines a `users` table with:
- UUID primary key (auto-generated)
- Username (unique, not null)
- Password (not null)

**Data Validation**: Zod schemas derived from Drizzle table definitions using `drizzle-zod` for runtime validation.

**Database Configuration**: Configured for PostgreSQL via Drizzle with Neon Database serverless driver, though not currently connected. Database migrations output to `./migrations` directory.

### Authentication and Authorization

**Planned Implementation**: Infrastructure in place for Passport.js-based authentication (dependencies installed) but not currently implemented. User schema exists for future authentication features.

**Session Management**: Dependencies for both in-memory sessions (memorystore) and PostgreSQL-backed sessions (connect-pg-simple) are installed but not configured.

### Build System

**Development**: 
- Vite dev server with HMR for frontend
- tsx for running TypeScript server code directly
- Replit-specific plugins for error overlay and dev banner

**Production**:
- Custom build script (`script/build.ts`) using esbuild for server bundling
- Vite build for client assets
- Server dependencies are selectively bundled (allowlist-based) to reduce file system calls and improve cold start performance
- Output: `dist/public/` for client assets, `dist/index.cjs` for server bundle

**Type Checking**: Separate TypeScript compilation check via `tsc` (no emit, validation only)

### Path Aliases

Consistent path aliasing across the application:
- `@/` → `client/src/` (frontend code)
- `@shared/` → `shared/` (shared types and schemas)
- `@assets/` → `attached_assets/` (static assets)

## External Dependencies

### UI Framework
- **Radix UI**: Complete set of accessible, unstyled React primitives (accordion, dialog, dropdown, popover, etc.)
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### State & Data Fetching
- **TanStack React Query**: Server state management with optimized caching
- **Wouter**: Lightweight routing library (< 2KB alternative to React Router)

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Validation resolver for React Hook Form with Zod

### Database & ORM
- **Drizzle ORM**: TypeScript ORM configured for PostgreSQL
- **@neondatabase/serverless**: Neon Database serverless driver for edge/serverless PostgreSQL
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables

### Server Dependencies
- **Express**: Web application framework
- **cors**: Cross-origin resource sharing middleware
- **express-session**: Session middleware (installed but not configured)
- **connect-pg-simple**: PostgreSQL session store (installed but not configured)

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution engine for development
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-dev-banner**: Development environment banner
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Utilities
- **clsx** & **class-variance-authority**: Dynamic className composition
- **tailwind-merge**: Intelligent Tailwind class merging
- **date-fns**: Date manipulation and formatting
- **lucide-react**: Icon library
- **nanoid**: Unique ID generation

### Additional UI Libraries
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel/slider component
- **vaul**: Drawer component
- **recharts**: Charting library (installed but not yet used)
- **react-day-picker**: Date picker component (installed but not yet used)
- **input-otp**: OTP input component (installed but not yet used)