# VasaVant - Operational Intelligence Studio

A premium Apple-style landing page for VasaVant, an Operational Intelligence Studio. Built with Next.js 16, TypeScript, Tailwind CSS v4, and TypeUI Premium design system.

## 🎨 Design Philosophy

**Apple-Inspired Premium Aesthetic:**
- Dark theme (Charcoal #0B0B0C, Rich Black #121214)
- Clean sans-serif typography (Inter font family)
- Dramatic whitespace and strict grid layouts
- Subtle tech accents (Deep Blue, Emerald Green, Amber)
- Glassmorphism effects and ambient glows
- Micro-interactions and smooth transitions

## 📋 Page Sections

### 1. Navigation
Minimalist floating glassmorphism header with smooth scroll effects.

### 2. Hero Section
- Large asymmetric layout with premium typography
- Animated fade-in effects
- Interactive data query visualization
- Dual CTA buttons

### 3. Problem Section
- Bento grid showcasing disconnected data silos
- WhatsApp, Excel, Email, Disconnected Systems, Institutional Knowledge
- Operational friction indicators

### 4. Solution Section
- 7-step data maturity progression stepper
- Visual progression from scattered data to digital agents
- Core philosophy: "The agent is only as useful as the system underneath it"

### 5. Services Section
- 6 premium capability cards with unique iconography
- Operational Intelligence Systems
- Data Automation & Workflow Design
- Business Dashboards & Reporting
- Internal Tools & Lightweight Apps
- Conversational Business Intelligence (WhatsApp BI)
- Agentic Operations (OpenClaw-Enabled)

### 6. Use Cases Section
- Interactive tabbed interface
- 5 real-world applications:
  - Logistics & Trucking Operations
  - Field Operations & Asset Tracking
  - Sales Operations & CRM Pipelines
  - Production & Daily Yield Reporting
  - Client, Project & Team Management

### 7. How We Work Section
- 8-part execution framework
- Clean numbered micro-grid layout
- Systematic deployment timeline

### 8. Final CTA
- Full-width immersive card with ambient radial glow
- Trust indicators (deployment time, custom solutions)
- Dual action buttons

## 🏗️ Project Structure

```
vasavant-website/
├── src/
│   ├── app/
│   │   ├── globals.css           # Dark theme design tokens & animations
│   │   ├── layout.tsx            # Root layout with Inter fonts
│   │   └── page.tsx              # Main landing page assembly
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx        # Premium button component
│   │   │   └── Card.tsx          # Reusable card with hover effects
│   │   ├── layout/
│   │   │   ├── Navigation.tsx    # Sticky glassmorphism navbar
│   │   │   └── Footer.tsx        # Clean footer with links
│   │   └── sections/
│   │       ├── Hero.tsx          # Hero with data visualization
│   │       ├── Problem.tsx       # Data silos bento grid
│   │       ├── Solution.tsx      # Maturity progression stepper
│   │       ├── Services.tsx      # Capabilities grid
│   │       ├── UseCases.tsx      # Interactive use case tabs
│   │       ├── HowWeWork.tsx     # Process framework
│   │       └── FinalCTA.tsx      # Conversion section
│   └── lib/
│       └── utils.ts              # Utility functions (cn)
├── .agents/
│   └── skills/
│       └── design-system/
│           └── SKILL.md          # TypeUI Premium design system
└── public/                       # Static assets
```

## 🚀 Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 🎨 Design Tokens

### Colors
- **Background:** `#0B0B0C` (Primary), `#121214` (Elevated)
- **Primary:** `#3B82F6` (Blue)
- **Secondary:** `#8B5CF6` (Purple)
- **Accents:** `#10B981` (Emerald), `#F59E0B` (Amber)
- **Text:** `#FFFFFF` (Primary), `#94A3B8` (Secondary), `#64748B` (Muted)

### Typography
- **Font:** Inter (weights: 100-900)
- **Scale:** 12/14/16/18/24/30/36px

### Spacing
- **Scale:** 4/8/12/16/24/32/48/64/80/96px

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)
- **Design System:** TypeUI Premium
- **Utilities:** clsx, tailwind-merge

## ✨ Key Features

- **Premium Aesthetics:** Apple-inspired dark theme with glassmorphism
- **Modular Components:** Clean, separated, composable React components
- **Responsive Design:** Mobile-first approach with perfect breakpoints
- **Interactive Elements:** Hover states, transitions, and micro-interactions
- **Accessibility:** WCAG 2.2 AA compliant, keyboard navigation
- **Performance:** Optimized with Next.js 16 and Turbopack
- **Type Safety:** Full TypeScript coverage

## 📝 Content Customization

### Update Copy
Edit the respective component files in `src/components/sections/` to update headlines, descriptions, and feature lists.

### Modify Colors
Update design tokens in `src/app/globals.css` under the `:root` selector.

### Add Sections
Create new section components in `src/components/sections/` and import them in `src/app/page.tsx`.

## 🎯 Design System Skill

The TypeUI Premium design system skill is located at `.agents/skills/design-system/SKILL.md` and provides comprehensive guidelines for:
- Visual style and brand consistency
- Typography and color usage
- Component patterns and states
- Accessibility requirements
- Content tone and writing standards

## 📧 Contact

- **Email:** hello@vasavant.com
- **Website:** Built with Next.js and TypeUI Premium

## 📄 License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
