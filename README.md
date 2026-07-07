# Wall Calendar – Interactive React Component

A polished, interactive wall calendar built with **Next.js 14** (App Router). Inspired by physical wall calendars with a hero image panel, date range selection, and a notes section.

## Features

- **Wall calendar aesthetic** – hero image panel with wave clip, spiral binding detail
- **Day range selector** – click start date, hover to preview, click end date; clear visual states for start, end, and in-between days
- **Notes per month** – persisted to `localStorage`, auto-saves with a "saved" flash
- **Custom photo upload** – replace the default Unsplash image with your own
- **Default monthly images** – curated Unsplash photos per month (requires internet)
- **Fully responsive** – stacked on mobile, side-by-side on tablet/desktop
- **Keyboard accessible** – all day cells are focusable and keyboard-clickable

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    globals.css        # Global styles & CSS variables
    layout.js          # Root layout (fonts, metadata)
    page.js            # Entry page
  components/
    WallCalendar.js    # Main calendar shell + spiral
    WallCalendar.module.css
    HeroPanel.js       # Image panel with upload + month badge
    HeroPanel.module.css
    CalendarGrid.js    # 7-column day grid with range states
    CalendarGrid.module.css
    NotesPanel.js      # Selection info + notes textarea
    NotesPanel.module.css
  hooks/
    useCalendar.js     # Month navigation + range selection state
    useNotes.js        # Notes state + localStorage persistence
  utils/
    dateHelpers.js     # Pure date utility functions
```

## Design Choices

- **Fonts**: Playfair Display (display/month name) + DM Sans (body) — elegant editorial pairing
- **Color system**: CSS custom properties for easy theming
- **CSS Modules**: scoped styles per component, no CSS-in-JS overhead
- **No backend**: all data lives in `localStorage`
- **Image fallback**: if Unsplash is unavailable, a gradient placeholder shows
