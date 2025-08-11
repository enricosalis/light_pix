# Light Pix

A lightweight photo gallery web application that displays your photo collection directly from the filesystem. Built with **Next.js 14** and designed for resource-constrained environments like Raspberry Pi boards.

## Features

* **Lightweight & Efficient**: Optimized for low-resource devices and minimal memory usage
* **Directory Navigation**: Browse photos organized in folder structures with breadcrumb navigation
* **Responsive Gallery**: Grid-based photo display that adapts to screen size
* **Full-Screen Carousel**: Click any image to open in a carousel viewer with navigation
* **Dark/Light Theme**: Automatic theme switching based on system preferences
* **Docker Ready**: Easy deployment with multi-stage optimized Docker builds
* **TypeScript**: Full type safety throughout the application

## Supported Image Formats

* JPEG/JPG
* PNG
* GIF
* BMP
* WebP
* SVG

## Prerequisites

* [Node.js 18+](https://nodejs.org/) for local development
* [Docker](https://docs.docker.com/get-docker/) for containerized deployment
* Photos organized in directories within `public/storage/`

## Quick Start

### Local Development

```bash
# Clone and install dependencies
git clone <repository-url>
cd light_pix
npm install

# Start development server
npm run dev
```

Access the application at `http://localhost:3000`

### Docker Deployment

```bash
# Build the image
docker build -t light-pix .

# Run the container
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/photos:/app/public/storage:ro \
  light-pix
```

Replace `/path/to/your/photos` with your actual photo directory path.

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── folder/[...folderName]/   # Dynamic directory routing
│   ├── columns.tsx               # Table column definitions
│   ├── data-table.tsx           # Directory listing component
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── gallery.tsx              # Photo grid component
│   ├── carousel.tsx             # Full-screen image viewer
│   ├── breadcrumb.tsx           # Navigation breadcrumbs
│   └── navbar.tsx               # Top navigation
└── lib/
    └── utils.ts                 # Utilities and image validation
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

### Storage Directory

Place your photos in `public/storage/` following your desired directory structure:

```
public/storage/
├── 2024/
│   ├── vacation/
│   │   ├── beach.jpg
│   │   └── sunset.png
│   └── family/
│       └── dinner.jpg
└── 2023/
    └── holidays/
        └── christmas.jpg
```

## Architecture

* **Framework**: Next.js 14 with App Router and TypeScript
* **Styling**: Tailwind CSS with shadcn/ui components
* **Image Handling**: Next.js Image component with automatic optimization
* **Carousel**: Embla Carousel for smooth image navigation
* **Tables**: TanStack Table for directory listings
* **Theme**: next-themes with system preference detection

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Docker Configuration

The included Dockerfile uses a multi-stage build optimized for production:

* **Build stage**: Installs dependencies and builds the application
* **Runtime stage**: Minimal Node.js Alpine image with only production files
* **Security**: Runs as non-root `nextjs` user
* **Optimization**: Uses Next.js standalone output for minimal container size

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

