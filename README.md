# Urara - Umamusume Pretty Derby Fan Guide

A comprehensive fan guide web application for Umamusume Pretty Derby, featuring character profiles, music tracks, news updates, and birthday celebrations. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Character browsing**: View detailed character profiles with bios, stats, fun facts, and dynamic accent colors that change per character
- **Music player**: Browse and preview tracks filtered by character, with play/pause functionality and singer icons
- **News feed**: Read latest news with search functionality and pagination
- **Birthday calendar**: See today's birthdays and upcoming birthdays for the current month
- **Translation support**: Japanese to English translation for character profiles and fun facts using MyMemory API
- **Responsive design**: Mobile, tablet, and desktop layouts with independent scrolling sections
- **Dark/Light mode**: Theme switching with persistent user preference
- **Gallery view**: Character image galleries with lightbox modal and label-based navigation

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type safety and better developer experience
- **React Router**: Navigation between pages
- **Tailwind CSS**: Styling and responsive design
- **Framer Motion**: Page transitions and animations
- **TanStack Query**: Data fetching and caching
- **Helmet**: SEO meta tags management
- **Umapyoi API**: Community-driven Umamusume data API
- **MyMemory API**: Free Japanese to English translation
  
## API Integration

This application uses the **Umapyoi API** (`https://umapyoi.net/api/v1`) as its primary data source and **MyMemoryAPI** for machine translation where required. No API keys or authentication required.

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `/character/list` | Retrieves all character profiles with thumbnails, colors, and categories |
| `/character/{id}` | Fetches detailed character information including bio, stats, and fun facts |
| `/character/images/{id}` | Gets character image gallery (Uniform, Racewear, etc.) |
| `/character/currentbirthdays` | Returns today's and upcoming birthdays |
| `/music/filters` | Provides filter options (characters, albums, song types) |
| `/music/filter?character={id}` | Returns tracks filtered by character with preview URLs |
| `/news/latest/{count}/{offset}` | Fetches news posts with pagination |
| `/news/search/{query}` | Searches news by keyword |

### Translation

The MyMemory API is used for Japanese to English translation of character profiles and fun facts. It requires no API key and has a generous free tier.

### Data Types

The application includes full TypeScript type definitions for all API responses:
- `CharacterListItem`, `CharacterDetail`, `CharacterImageSet`
- `Track`, `MusicAlbum`, `MusicSinger`
- `NewsPost`
- `BirthdayCharacter`

## Environment Variables

No API keys required. The application works out of the box with the public Umapyoi API.

## Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── api/               # API endpoint functions
│   ├── assets/            # Images and static files
│   ├── components/        # Reusable UI components
│   │   ├── characters/    # Character-specific components
│   │   ├── music/         # Music-specific components
│   │   ├── news/          # News-specific components
│   │   └── Container.tsx  # Layout wrapper
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Main route components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
└── vite.config.ts
```
## Component Architecture

### Pages

- **Home**: Hero section with vertical navbar, birthday tabs, and featured music tracks
- **Characters**: Character roster sidebar with detail view, profile info, fun facts, gallery, and voice samples
- **Music**: Character filter with track listing, preview player, and singer avatars
- **News**: Searchable news feed with pagination and detail modal

### Reusable Components

**Characters Page Components:**
- `CharacterSidebar`: Searchable character list with thumbnails
- `CharacterHero`: Banner with character name, category, and gradient background
- `CharacterProfile`: Stats and bio information with translation toggle
- `CharacterFunFacts`: Ears, tail, and family facts with translation
- `CharacterGallery`: Image gallery with label navigation and lightbox
- `CharacterVoiceSample`: Audio player for voice clips

**Music Page Components:**
- `MusicHeader`: Title and search input
- `CharacterFilter`: Character buttons with icons (horizontal on mobile, vertical on desktop)
- `TrackList`: Scrollable list of tracks
- `TrackItem`: Individual track row with album art, info, singer icons, and play button
- `MusicPlayer`: Hidden audio element for preview playback

**News Page Components:**
- `NewsHeader`: Title and search input
- `NewsCard`: Individual news entry with image, label, and date
- `NewsDetailModal`: Full article view with HTML content
- `NewsList`: Scrollable list with load more pagination

## Routing

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, birthdays, and featured music |
| `/characters` | Character browser with detailed profiles |
| `/music` | Music catalog with character filtering |
| `/news` | News feed with search |

## Key Features Explained

### Dynamic Accent Colors
Each character's `color_main` property dynamically updates the UI accent color throughout the page, including buttons, borders, and highlights.

### Translation System
- MyMemory API integration for Japanese to English translation
- `cleanText` helper removes `\n` characters from both source and translated text
- Toggle button shows either original Japanese or machine-translated English

### Responsive Design
- **Desktop**: Sidebar character filter with vertical layout, full viewport height
- **Mobile/Tablet**: Horizontal scrolling character filter, independently scrollable track lists

### Gallery
- Label-based image navigation (Uniform, Racewear, etc.)
- Lightbox modal for full-size viewing
- Horizontal scroll on mobile, button navigation on desktop

## Deployment
This website is hosted on GitHub Pages. You can view the live version at:
[https://deancruz1.github.io/Urara](https://deancruz1.github.io/Urara)

## Environment Variables

No API keys required for basic functionality. The MyMemory API works without authentication.

## Future Improvements

- User accounts for favoriting characters and tracks
- Playlist creation for music
- News bookmarking
- Community comments on news posts
- Character comparison tool
- Search filters for music (by album, artist, etc.)

## Contact Information
If you'd like to get in touch with me, here are the best ways to reach me:
- **Email:** [deancruzgg@gmail.com](mailto:deancruzgg@gmail.com)
- **GitHub:** [https://github.com/deancruz1](https://github.com/deancruz1)
- **LinkedIn:** [https://www.linkedin.com/in/dean-cruz/](https://www.linkedin.com/in/dean-cruz/)
- **Location:** Singapore, SG


---

*This is a fan project and is not affiliated with or endorsed by Cygames, Inc. or any official Umamusume Pretty Derby rights holders.*
