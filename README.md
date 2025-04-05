# Next.js E-commerce Store

This is a basic e-commerce platform built with Next.js (App Router), Tailwind CSS, and React Query.

## Tech Stack

- Node v22 LTS
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Zustand (for cart, auth, and favorites state)
- ESLint (with default Next.js config)

---

## Features Implemented

### Project Setup

- Initialized with `create-next-app` using App Router
- Tailwind CSS configured with a basic custom theme (primary, secondary, accent)
- React Query integrated globally with a custom `fetcher`
- Zustand used across the app for shared state (cart, auth, favorites)
- ESLint and project structure organized under `src/`

---

### Product Catalog (`/products`)

- Products are fetched from Fake Store API using React Query (`useQuery`)
- Grid layout with responsive design for mobile, tablet, desktop
- Hover-based prefetching of product details using `queryClient.prefetchQuery`
- Empty, error, and loading states handled
- Strict typing applied for API data
- Products can be favorited directly from the catalog
- Real-time visual feedback for favorites

---

### Product Detail Page (`/products/[id]`)

- Dynamic page for each product with full details (image, title, description, price, category)
- Related products section implemented using a parallel query based on category
- Prefetching works via catalog hover interaction
- "Add to Cart" button with visual feedback
- Immediate state update and styling on "Add to Favorites"
- Responsive and styled consistently with catalog

---

### Shopping Cart (Persistent Sidebar)

- Zustand with `persist` middleware for localStorage support
- Cart drawer opens from a floating button on all pages
- Functionality includes: add item, remove item, update quantity, clear cart
- Subtotal, 15% tax, and total displayed
- Supports responsive layout and keyboard closing (Escape key)
- Styled for both light and dark themes

---

### Simulated Authentication (`/login`, `/account`)

- Zustand-based simulated auth with persistent username
- Protected route: `/account` redirects to `/login` if unauthenticated
- Logout functionality resets user and redirects
- Account page displays a simulated order history

---

### Favorites Feature (`/favorites`)

- Users can mark/unmark products as favorites (persisted in localStorage)
- Favorites displayed on a dedicated page
- Each product in the catalog and detail page reflects real-time favorite state
- Accessible and styled with visual feedback

---

### Global Layout and Navigation

- Global `Header` component visible on all pages
- Active page is visually highlighted in the navigation
- Manual dark mode toggle included (stored in localStorage)
- Layout is styled with consistent padding, spacing, and visual rhythm

---

### Accessibility

- ARIA roles added for navigation landmarks and main content
- All interactive elements use native `button` or `a` tags
- Focus rings visible on keyboard navigation
- Icons and labels structured with proper `aria-hidden` or fallback text

---

## How to Run Locally

1. Clone the repo:
   git clone git@github.com:roadev/next-store.git

2. Install dependencies:
   npm install

3. Start the dev server:
   npm run dev

4. Open the app:
   http://localhost:3000/products

---

## Technical Notes

- Zustand was chosen over Redux for simplicity, minimal setup, and good performance with persisted state
- React Query handles all product fetching, caching, prefetching, and state transitions
- Layout and structure follow a domain-agnostic, minimal, and scalable setup
- Styles follow Tailwind conventions and keep visual hierarchy consistent
- Manual dark mode toggle was implemented using class-based approach with localStorage
- Favorites and cart persist across sessions
- No unnecessary libraries were added for toasts or UI frameworks to keep the bundle lean

---

## Known Improvements / TODO

- Dark mode toggle may not sync correctly on initial load in all environments
- No loading skeletons were implemented (only text-based loading states)
- No backend, so orders are simulated
