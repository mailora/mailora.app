# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with automatic fixes
- `pnpm check-types` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Architecture Overview

**Mailora** is an AI email writing assistant built with Next.js 15 App Router. Key architectural components:

### Core Technology Stack

- **Next.js 15** with App Router and Turbopack for development
- **TypeScript** with strict configuration
- **Tailwind CSS v4** for styling
- **MongoDB** with Mongoose ODM for data persistence
- **React Query** (@tanstack/react-query) for server state management
- **Zod** for runtime type validation and environment variables

### Project Structure

- `src/app/` - Next.js App Router pages (auth, dashboard, billing, settings, ai-chat)
- `src/components/` - Reusable UI components using shadcn/ui
- `src/db/` - Database connection and configuration (MongoDB/Mongoose)
- `src/env.ts` - Environment variable validation with @t3-oss/env-nextjs
- `src/lib/` - Utility functions and shared configuration
- `src/providers/` - React context providers (theme, react-query)
- `src/i18n/` - Internationalization setup with next-intl

### Key Features

- AI-powered email generation with Google and OpenAI integration
- Authentication system with OAuth (Google, Microsoft)
- Multi-language support (English, Hindi)
- Theme support (light/dark mode)
- Responsive design with mobile-first approach

### Database Architecture

- Uses MongoDB with Mongoose for data modeling
- Environment-based configuration through validated env variables
- Separate connection modules for MongoDB and Mongoose

### UI/UX Framework

- Built on shadcn/ui components with Radix UI primitives
- Consistent design system with theme provider
- Responsive layout with sidebar navigation
- Form handling with react-hook-form and Zod validation

## Environment Configuration

Environment variables are validated through `src/env.ts` using @t3-oss/env-nextjs:

- Database connection (DATABASE_URL)
- Authentication secrets and OAuth credentials
- Application URLs and domains
- Required: AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET

## Development Workflow

1. Always run `pnpm check-types` before committing changes
2. Use `pnpm lint:fix` to automatically fix linting issues
3. The project uses Husky for pre-commit hooks with lint-staged
4. Follow the existing component patterns in `src/components/ui/`
5. Database operations should use the established Mongoose patterns in `src/db/`
