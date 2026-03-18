# Faiza Amjad — Project Instructions

## Project Overview
E-commerce store for Faiza Amjad built with Next.js + Tailwind CSS.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, TypeScript
- **Design**: Stitch (via MCP) — designs are provided one by one and implemented screen by screen
- **Backend**: WordPress (headless CMS / WooCommerce for e-commerce data)
- **API**: WordPress REST API or WPGraphQL to fetch products, categories, orders, etc.

## Workflow
1. User provides Stitch screen designs via MCP
2. Implement each screen as a Next.js page/component matching the design pixel-perfectly
3. Once all screens are designed, integrate WordPress backend

## Design Implementation Rules
- Match Stitch designs as closely as possible
- Use Tailwind CSS utility classes for all styling
- Keep components modular — one component per UI section
- Place reusable components in `src/components/`
- Place page files in `src/app/` (App Router)
- Place types in `src/types/`
- Place API/utility functions in `src/lib/`
- Place custom hooks in `src/hooks/`

## WordPress Integration (later phase)
- Connect to WordPress REST API or WPGraphQL
- Products come from WooCommerce
- Pages/content from WordPress CMS
- Store API base URL and credentials in `.env.local` (never commit)

## Key Conventions
- TypeScript strict mode
- No inline styles — Tailwind only
- Functional components with hooks
- Fetch data server-side where possible (Next.js Server Components)
