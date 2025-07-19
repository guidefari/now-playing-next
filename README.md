# Now Playing - Guide

A server-side rendered Next.js application that displays what Guide is currently listening to on Spotify.

## Features

- **Server-Side Rendering (SSR)**: The app is now fully server-side rendered for better performance and SEO
- **TanStack Query**: Uses TanStack Query for data fetching with SSR support
- **Real-time Updates**: Automatically refreshes the now-playing data every 30 seconds
- **Modern UI**: Built with Tailwind CSS and modern React patterns

## Tech Stack

- **Next.js 15** with App Router
- **React 19**
- **TanStack Query** for data fetching and caching
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables:
   Create a `.env.local` file with:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The app uses Next.js App Router with the following structure:

- `src/app/layout.tsx` - Root layout with TanStack Query provider
- `src/app/page.tsx` - Server component that prefetches data
- `src/app/NowPlayingClient.tsx` - Client component that renders the UI
- `src/app/api/now-playing/route.ts` - API route for fetching Spotify data
- `src/components/NowPlaying.tsx` - Reusable component for displaying track info

## SSR Implementation

The app implements SSR by:

1. **Prefetching data on the server** in `page.tsx` using TanStack Query's `prefetchQuery`
2. **Hydrating the client** with the prefetched data using `HydrationBoundary`
3. **Continuing client-side updates** with automatic refetching every 30 seconds

This ensures fast initial page loads while maintaining real-time updates on the client.

## Build and Deploy

```bash
bun run build
bun run start
```