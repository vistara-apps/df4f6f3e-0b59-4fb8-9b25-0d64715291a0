# Project Palooza

Find your perfect project partner, the fun way.

A Base Mini App connecting gay men for collaborative projects through a Tinder-like matching experience.

## Features

- **Project Matching**: Swipe left or right on project cards based on descriptions, required skills, and interests
- **Profile & Project Showcase**: Create profiles highlighting skills, interests, and past projects
- **In-App Chat**: Communicate directly with matched project partners
- **Base Integration**: Built with MiniKit for seamless Base ecosystem integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Add your OnchainKit API key to `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base (via MiniKit)
- **Identity**: OnchainKit
- **Language**: TypeScript

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── lib/                # Utilities and types
└── public/             # Static assets
```

## Key Components

- `ProjectCard`: Displays project information with swipe functionality
- `ProfileCard`: Shows user profile with skills and interests
- `SwipeButton`: Interactive buttons for like/dislike actions
- `MatchNotification`: Celebrates successful matches
- `ChatBubble`: Message display in chat interface

## Development

This is a Base Mini App built with MiniKit. Make sure to:

1. Use the MiniKitProvider for Base chain integration
2. Follow mobile-first design principles
3. Implement proper error handling and loading states
4. Test in Base App environment

## License

MIT License - see LICENSE file for details
