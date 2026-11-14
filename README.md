# Urara - Umamusume Pretty Derby Fan Guide

A fan guide for Umamusume Pretty Derby: character profiles, songs with previews, official news, and birthdays. It's styled like a Japanese horse-racing programme (出馬表): a turf-green header, the eight JRA gate colours, condensed numerals and English/Japanese label pairs. Built with React, TypeScript, Tailwind CSS and TanStack Query.

## Features

- **Birthday countdown**: today's birthdays when there are any; otherwise the number of days to the next one, plus a queue of the six dates after it. Dates use Japan time, so every visitor sees the same "today".
- **Birthdays per month chart**: how character birthdays spread across the year, with the current month marked.
- **This week's field**: eight featured characters in a race-card table, the same for everyone from Monday to Sunday (JST) and reshuffled each week.
- **Character browser**: a searchable list (English name, Japanese name or category) and a profile for each character: details, official colours, good at / bad at, self-introduction with voice line, trivia, and an outfit gallery with an enlarged view. Characters Umapyoi hasn't translated yet show a "no English profile yet" message.
- **Music**: songs filtered by the character who sings them, searchable by English or Japanese title, with short previews. Only one sound plays at a time.
- **News**: the latest official announcements with search and "Load more". Each post opens in a dialog and has its own link (`/news?post=<id>`), which also works when opened fresh.
- **Shareable links**: character and news links keep their full address when pasted or refreshed on GitHub Pages.
- **Accessible and responsive**: works by keyboard with a "Skip to content" link, Japanese text is marked for screen readers, and every page fits phone widths from 360px with no sideways scrolling. Light theme only.

## Technologies Used

- **React** with **TypeScript**
- **React Router**: navigation between pages
- **Tailwind CSS**: styling, with the Race Card colour and font tokens in `src/index.css`
- **TanStack Query**: data fetching and caching
- **React Helmet Async**: page titles and meta tags
- **DOMPurify**: cleans news post HTML before it is displayed
- **Vitest** with **jsdom**: unit tests for the date, rotation, redirect and sanitising logic
- **Google Fonts**: Saira Condensed and Zen Kaku Gothic New
- **Umapyoi API**: community-driven Umamusume data

## Scripts

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server at `http://localhost:5173/Urara/` |
| `npm test` | Run the unit tests once |
| `npm run lint` | Lint the project with ESLint |
| `npm run build` | Type-check and build the site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch (the live site) |

## API Integration

The site reads everything from the **Umapyoi API** (`https://umapyoi.net/api/v1`). No API keys or authentication are needed.

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `/character/list` | Every character with portrait, colours and category |
| `/character/info` | Every character with birthday, colours and height (home page) |
| `/character/{id}` | One character's full profile |
| `/character/images/{id}` | One character's outfit image sets (Uniform, Racewear, …) |
| `/music/filters` | Characters available as song filters |
| `/music/filter?character={id}` | Songs sung by a character, with preview URLs |
| `/news/latest/{count}/{offset}` | The latest news posts |
| `/news/{id}` | One news post, for post links |
| `/news/search/{query}` | News search |

## Project Structure

```text
├── public/                 # Static files: icons, manifest, 404 redirect, preview image
├── src/
│   ├── api/                # API endpoint functions
│   ├── assets/             # Key art
│   ├── components/
│   │   ├── ui/             # Shared Race Card parts: header, footer, headings, dialog, play button…
│   │   ├── home/           # Home page sections
│   │   ├── characters/     # Character list and profile
│   │   ├── music/          # Character filter and song list
│   │   └── news/           # News rows and post dialog
│   ├── data/               # Curated featured songs
│   ├── hooks/              # Data hooks and the shared audio preview controller
│   ├── lib/                # Pure logic with unit tests: JST dates, birthdays, weekly rotation, redirects, sanitising
│   ├── pages/              # Route components
│   ├── types/              # API response types
│   ├── App.tsx             # Shared header, footer, scroll and error handling
│   ├── index.css           # Design tokens
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Routing

| Route | Description |
|-------|-------------|
| `/` | Home: title block, birthdays, monthly chart, this week's field, featured songs and latest news |
| `/characters?id={id}` | Character browser; `id` selects a character |
| `/music` | Songs by character |
| `/news?post={id}` | News; `post` opens a post |
| anything else | Not-found page |

## Deployment

The site is hosted on GitHub Pages under the `/Urara/` base path: [https://deancruz1.github.io/Urara](https://deancruz1.github.io/Urara)

GitHub Pages serves `public/404.html` for deep links. It forwards the full path, query string and fragment to the app, which restores the original address.

## Future Improvements

- User accounts for favouriting characters and songs
- Playlists for music
- News bookmarking
- Character comparison tool
- Music search filters (by album, artist, etc.)

## Contact Information
If you'd like to get in touch with me, here are the best ways to reach me:
- **Email:** [deancruzgg@gmail.com](mailto:deancruzgg@gmail.com)
- **GitHub:** [https://github.com/deancruz1](https://github.com/deancruz1)
- **LinkedIn:** [https://www.linkedin.com/in/dean-cruz/](https://www.linkedin.com/in/dean-cruz/)
- **Location:** Singapore, SG

---

*This is a fan project and is not affiliated with or endorsed by Cygames, Inc. or any official Umamusume Pretty Derby rights holders.*
