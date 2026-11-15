# GovAccess — Semantic HTML5 & Accessible Dashboard

A responsive React + Vite dashboard starter demonstrating semantic HTML5, accessible navigation, tables, forms, and a native modal dialog.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Pages
- Dashboard overview
- Analytics
- Reports

Navigation uses client-side history with real anchor links and a fallback for direct page loads.

## Accessibility features
- Semantic `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`
- Skip link and visible keyboard focus
- Explicit labels, fieldsets, legends, native validation, and inline status messages
- Table caption and scoped column headers
- Native `<dialog>` modal with focus handling and Escape support
- `aria-current`, `aria-live`, and descriptive accessible names
- Responsive layout and reduced-motion support

## Validate
1. Run `npm run build`.
2. Run the app and validate the served page at https://validator.w3.org/nu/ using the URL option, or upload `dist/index.html` after building.
3. Check keyboard navigation and test with a screen reader.

A clean build is not the same as a completed WCAG audit. Validate all routes and interactive states in your target environment.
