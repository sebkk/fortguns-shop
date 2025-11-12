# FortGuns Shop

Modern e-commerce store built with Next.js 15 for FortGuns - a firearms and shooting equipment store.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Technologies](#technologies)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Versioning](#versioning)

## 🎯 About the Project

FortGuns Shop is an e-commerce application using Next.js 15 with App Router, integrated with WooCommerce and WordPress CMS. The project utilizes Static Site Generation (SSG) with Incremental Static Regeneration (ISR) for optimal performance and SEO.

## 🛠 Technologies

### Core

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.1** - UI library
- **TypeScript 5** - Static typing
- **SCSS/SASS** - CSS preprocessor

### Internationalization

- **next-intl 4.1.0** - Multi-language support (currently PL, prepared for EN)

### E-commerce & CMS

- **WooCommerce REST API** - WooCommerce store integration
- **WordPress REST API** - WordPress CMS integration

### Forms & Validation

- **React Hook Form 7.56.3** - Form management
- **Zod 3.24.4** - Schema validation
- **@hookform/resolvers 5.0.1** - Zod integration with React Hook Form

### UI & UX

- **Swiper 11.2.5** - Carousels and sliders
- **@react-google-maps/api 2.20.6** - Google Maps integration
- **react-cookie-consent 9.0.0** - Cookie consent
- **@bprogress/next 3.2.12** - Navigation progress indicator

### Analytics & SEO

- **@vercel/analytics 1.5.0** - Vercel Analytics
- **@vercel/speed-insights 1.2.0** - Speed Insights
- **next-sitemap 4.2.3** - Sitemap generation
- **schema-dts 1.1.5** - Structured Data (JSON-LD)

### Security

- **react-google-recaptcha-v3 1.11.0** - Google reCAPTCHA v3

### Development Tools

- **ESLint** - Linter
- **Prettier** - Code formatting
- **Stylelint** - CSS/SCSS linter
- **TypeScript** - Static typing

## ✨ Features

### E-commerce

- ✅ Product listing with pagination
- ✅ Product details
- ✅ Category filtering
- ✅ Brand pages
- ✅ Product search
- ✅ Breadcrumbs
- ✅ Product prices

### CMS Integration

- ✅ Dynamic content sections
- ✅ Hero sections
- ✅ Image galleries
- ✅ Product carousels
- ✅ Newsletter
- ✅ Accordion/FAQ
- ✅ HTML content sections

### Forms

- ✅ Contact form
- ✅ Newsletter subscription
- ✅ Validation with reCAPTCHA v3
- ✅ Email sending via SMTP

### SEO & Performance

- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Automatic sitemap generation
- ✅ Metadata and Open Graph
- ✅ Structured Data (JSON-LD)
- ✅ Image optimization (WebP)
- ✅ Lazy loading

### Internationalization

- ✅ Multi-language support (next-intl)
- ✅ Routing with language prefixes
- ✅ Prepared for English language

### Analytics & Monitoring

- ✅ Google Analytics
- ✅ Vercel Analytics
- ✅ Vercel Speed Insights
- ✅ Route change tracking

### UX Features

- ✅ Responsive design
- ✅ Mobile-first approach
- ✅ Cookie consent
- ✅ Progress indicator on navigation
- ✅ Drawer menu
- ✅ Modal windows
- ✅ Skeleton loaders

## 📦 Requirements

- **Node.js** >= 18.x
- **pnpm** >= 9.0.0 (or npm/yarn)
- Access to WordPress/WooCommerce API
- Environment variables configured (see [Configuration](#configuration))

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fortguns-shop
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_API_URL=https://your-wordpress-api-url.com
   NEXT_PUBLIC_CONSUMER_KEY=your_woocommerce_consumer_key
   NEXT_PUBLIC_CONSUMER_SECRET=your_woocommerce_consumer_secret
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   SMTP_FROM=your_email@example.com
   ```

4. **Fetch data from API (before build)**

   ```bash
   pnpm run fetch:all
   ```

5. **Run development server**

   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

| Variable                          | Description                 | Required |
| --------------------------------- | --------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`             | WordPress REST API URL      | ✅       |
| `NEXT_PUBLIC_CONSUMER_KEY`        | WooCommerce Consumer Key    | ✅       |
| `NEXT_PUBLIC_CONSUMER_SECRET`     | WooCommerce Consumer Secret | ✅       |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API Key         | ⚠️       |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | reCAPTCHA public key        | ⚠️       |
| `RECAPTCHA_SECRET_KEY`            | reCAPTCHA secret key        | ⚠️       |
| `SMTP_HOST`                       | SMTP host                   | ⚠️       |
| `SMTP_PORT`                       | SMTP port                   | ⚠️       |
| `SMTP_USER`                       | SMTP user                   | ⚠️       |
| `SMTP_PASS`                       | SMTP password               | ⚠️       |
| `SMTP_FROM`                       | Email sender address        | ⚠️       |

### Next.js Config

Main settings are located in `next.config.ts`:

- SCSS configuration with global variables and mixins
- Remote patterns for images
- Image optimization (WebP)
- next-intl configuration

## 📜 Scripts

### Development

```bash
pnpm dev          # Run development server with Turbopack
```

### Build

```bash
pnpm build        # Production build (automatically fetches data before build)
pnpm start        # Run built application
```

### Data Fetching

```bash
pnpm fetch:all    # Fetch all data from API (global infos, menu, footer)
```

### Code Quality

```bash
pnpm lint         # Run ESLint
pnpm format       # Format code with ESLint
```

### Versioning

```bash
pnpm version:show        # Show current version
pnpm version:patch       # Increment patch version (0.1.0 → 0.1.1)
pnpm version:minor       # Increment minor version (0.1.0 → 0.2.0)
pnpm version:major       # Increment major version (0.1.0 → 1.0.0)
pnpm release:patch       # Versioning + build (patch)
pnpm release:minor       # Versioning + build (minor)
pnpm release:major       # Versioning + build (major)
```

## 📁 Project Structure

```
fortguns-shop/
├── public/                 # Static files (images, favicon, robots.txt)
│   └── pictures/          # Product images and logos
├── scripts/               # Utility scripts
│   └── fetch-all-data.ts  # API data fetching script
├── src/
│   ├── api/               # API clients (WordPress, WooCommerce)
│   │   ├── woocommerce/   # WooCommerce API (products, categories, brands)
│   │   └── custom.ts      # Custom API endpoints
│   ├── app/               # Next.js App Router
│   │   ├── [locale]/      # Localized pages
│   │   │   ├── products/  # Product listing
│   │   │   ├── product/   # Product details
│   │   │   ├── brands/    # Brand pages
│   │   │   └── [dynamicSlug]/ # Dynamic CMS pages
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── _carousels/    # Carousel components
│   │   ├── _form/         # Form components
│   │   ├── _icons/        # SVG icons
│   │   ├── _sections/     # Content sections
│   │   ├── Header/        # Site header
│   │   ├── Footer/        # Site footer
│   │   ├── ProductCard/   # Product card
│   │   └── ...            # Other components
│   ├── constants/         # Constants and configuration
│   │   ├── api/           # API data (auto-generated)
│   │   └── ...            # Other constants
│   ├── features/          # Feature-based modules
│   │   ├── products/      # Product functionality
│   │   ├── brands/        # Brand functionality
│   │   ├── homepage/      # Homepage
│   │   └── ...            # Other features
│   ├── handlers/          # Data handlers (fetching, processing)
│   ├── helpers/           # Helper functions
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization configuration
│   ├── providers/         # React providers
│   ├── types/             # TypeScript type definitions
│   └── assets/            # Assets (styles, images)
│       └── styles/        # Global SCSS styles
├── translations/           # Translation files
│   └── pl.json           # Polish translations
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

### Key Directories

- **`src/app/`** - Next.js App Router with routing and pages
- **`src/components/`** - Reusable React components
- **`src/features/`** - Functional modules (feature-based architecture)
- **`src/handlers/`** - Data fetching and processing logic
- **`src/api/`** - API clients for backend communication
- **`src/constants/api/`** - Static API data (generated by scripts)

## 🚢 Deployment

### Build Process

1. **Pre-build**: Automatic API data fetching

   ```bash
   pnpm run fetch:all
   ```

2. **Build**: Static page generation

   ```bash
   pnpm run build
   ```

3. **Post-build**: Sitemap generation
   ```bash
   next-sitemap
   ```

### Vercel (Recommended)

The project is optimized for Vercel:

1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Vercel will automatically detect Next.js and configure the build

### Other Platforms

The project can be deployed on any platform supporting Next.js:

- Netlify
- AWS Amplify
- Docker
- VPS with Node.js

## 📝 Versioning

The project uses Semantic Versioning. Details in [VERSION_MANAGEMENT.md](./VERSION_MANAGEMENT.md).

### Quick Start

```bash
# Check current version
pnpm run version:show

# Increment version and build
pnpm run release:patch  # for bugfixes
pnpm run release:minor  # for new features
pnpm run release:major  # for breaking changes
```

## 🔧 Development

### Code Conventions

- **TypeScript** - All files in TypeScript
- **SCSS Modules** - Styles in SCSS modules
- **Feature-based** - Code organization by functionality
- **Component-based** - Reusable React components

### Linting & Formatting

```bash
# Check for errors
pnpm lint

# Auto-fix
pnpm format
```

### Adding New Features

1. Create a folder in `src/features/` for the new functionality
2. Add components in `src/components/` if they are reusable
3. Add handlers in `src/handlers/` for business logic
4. Update types in `src/types/` if needed

## 📄 License

Private project - all rights reserved.

## 👥 Authors

FortGuns Development Team

---

**Note**: Before the first production build, make sure that:

1. All environment variables are configured
2. API data has been fetched (`pnpm run fetch:all`)
3. Tests have been run and passed successfully
