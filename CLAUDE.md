# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Light Pix is a lightweight photo gallery web application built with Next.js 14. It serves photos directly from the filesystem and is designed for resource-constrained environments like Raspberry Pi. The app displays directory structures as browsable tables and images as a responsive gallery with carousel functionality.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Structure
- **App Router**: Uses Next.js 14 App Router with TypeScript
- **Dynamic Routing**: `folder/[...folderName]/page.tsx` handles nested directory navigation
- **File System Integration**: Reads directly from `public/storage/` directory structure

### Key Components
- **Gallery** (`src/components/gallery.tsx`): Grid-based image display with click-to-carousel functionality
- **Carousel** (`src/components/carousel.tsx`): Full-screen image viewer using Embla Carousel
- **DataTable** (`src/app/data-table.tsx`): Directory listing with TanStack Table
- **Breadcrumb** (`src/components/breadcrumb.tsx`): Navigation path display

### State Management
- Uses React state (no external state management)
- Theme handling via `next-themes` with system preference detection

### Image Handling
- **Validation**: Dual validation using file extensions and MIME types (`src/lib/utils.ts`)
- **Supported formats**: jpg, jpeg, png, gif, bmp, webp, svg
- **Optimization**: Next.js Image component with object-fit cover/contain

### Styling
- **Tailwind CSS** with custom configuration
- **shadcn/ui** components (configured in `components.json`)
- **Responsive design**: Grid layout adapts to screen size

## File Organization Patterns

```
src/
├── app/                    # App Router pages
│   ├── folder/[...folderName]/  # Dynamic directory routing
│   ├── columns.tsx         # Table column definitions
│   └── data-table.tsx      # Directory table component
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui components
│   └── *.tsx              # Custom components
└── lib/                   # Utilities and helpers
```

## Docker Configuration

- **Multi-stage build**: Optimized for production deployment
- **Standalone output**: Next.js standalone mode for minimal container size
- **Port 3000**: Default container port
- **Non-root user**: Runs as `nextjs` user for security

## Path Handling

- **Storage path**: Images served from `public/storage/`
- **Relative paths**: Components use `relativePath` prop for image sources
- **Dynamic routing**: URL segments map directly to filesystem structure

## Key Dependencies

- **@tanstack/react-table**: Data table functionality
- **embla-carousel-react**: Carousel/slider implementation
- **lucide-react**: Icon library
- **mime**: MIME type detection
- **next-themes**: Theme switching functionality