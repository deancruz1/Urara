# Urara - Umamusume Pretty Derby Fan Guide

A fan guide for Umamusume Pretty Derby: character profiles, songs with previews, official news, and birthdays. It's styled like a Japanese horse-racing programme (出馬表): a turf-green header, the eight JRA gate colours, condensed numerals and English/Japanese label pairs. Built with React, TypeScript, Tailwind CSS and TanStack Query.

## Features

- **Birthday countdown**: today's birthdays when there are any; otherwise the number of days to the next one, plus a queue of the six dates after it. Dates use Japan time, so every visitor sees the same "today".
- **This week's field**: eight featured characters in a race-card table, the same for everyone from Monday to Sunday (JST) and reshuffled each week.
- **Character browser**: a searchable list (English name, Japanese name or category) and a profile for each character at its own address (`/characters/king-halo`): details, official colours, good at / bad at, self-introduction with voice sample, trivia, and an outfit gallery with an enlarged view. Characters Umapyoi hasn't translated yet show a "no English profile yet" message.
- **Music**: songs filtered by the character who sings them (`/music/haru-urara`), searchable by English or Japanese title, with short previews. Only one sound plays at a time.
- **News**: the latest official announcements with search and "Load more". Each post opens in a dialog and has its own link (`/news?post=<id>`), which also works when opened fresh.
- **Pre-rendered pages**: every page, including each character and singer, is built to static HTML, so search engines and link previews get real content and a 200 status. The app takes over in the browser with the same data, so there is no loading flash.
- **Light and dark themes**: follows the system setting until you pick one. The toggle plays a "gate break": eight lanes in the gate colours race across the screen as the new theme slides in.
- **Accessible and responsive**: works by keyboard with a "Skip to content" link, Japanese text is marked for screen readers, animations switch off with reduced motion, and every page fits phone widths from 360px with no sideways scrolling.

## Technologies Used

- **React** with **TypeScript**
- **React Router**: navigation between pages
- **Tailwind CSS**: styling, with the Race Card colour and font tokens in `src/index.css`
- **TanStack Query**: data fetching and caching
- **React Helmet Async**: page titles and meta tags
- **DOMPurify**: cleans news post HTML before it is displayed
- **Vitest** with **jsdom**: unit tests for the date, rotation, redirect, sanitising and pre-render logic
- **React DOM server**: the build renders every route to HTML (`src/entry-server.tsx`, `scripts/prerender.mjs`), with no extra dependencies
- **Google Fonts**: Saira Condensed and Zen Kaku Gothic New
- **Umapyoi API**: community-driven Umamusume data

## Scripts

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server at `http://localhost:5173/Urara/` |
| `npm test` | Run the unit tests once |
| `npm run lint` | Lint the project with ESLint |
| `npm run build` | Type-check, build the site into `dist/` and pre-render every page (needs internet; about 90 seconds) |
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
├── scripts/                # Build-time pre-rendering and its tests
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
│   ├── entry-server.tsx    # Renders one route to HTML at build time
│   ├── index.css           # Design tokens
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Routing

| Route | Description |
|-------|-------------|
| `/` | Home: title block, birthdays, this week's field, featured songs and latest news |
| `/characters/{slug}` | Character browser with one character selected; `/characters` shows the first. Old `?id=` links redirect here |
| `/music/{slug}` | Songs by one character; `/music` shows Haru Urara |
| `/news?post={id}` | News; `post` opens a post |
| anything else | Not-found page |

## Deployment

The site is hosted on GitHub Pages under the `/Urara/` base path: [https://deancruz1.github.io/Urara](https://deancruz1.github.io/Urara)

`npm run build` writes a static file for every page (`characters/king-halo.html`, `music/haru-urara.html` and so on) plus a sitemap. GitHub Pages serves `/characters/king-halo` from `characters/king-halo.html`, so each page loads with its content and a 200 status.

Any other address (an old link, or a page that couldn't be built because the API was down) falls back to `public/404.html`, which forwards the full path, query string and fragment to the app so it can restore the original address.

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
