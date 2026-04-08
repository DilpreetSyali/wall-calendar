# 📅 Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with **React + Vite** (lightweight — only ~35MB of dependencies vs 300MB for CRA).

---

## 🚀 Quick Start

```bash
# 1. Open this folder in VS Code terminal
cd wall-calendar

# 2. Install (fast — only 3 real dependencies)
npm install

# 3. Start dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.
SEE LIVE ON :   https://wall-calendar-386b.onrender.com

---

## ✨ Features

- **Wall calendar aesthetic** — paper texture, spiral binding rings, physical feel
- **12 monthly hero photos** — Unsplash images, each with its own adaptive accent color
- **Chevron image cuts** — diagonal clip-path where photo meets calendar grid
- **Page-flip animation** — rotateX flip when navigating months
- **Day range selector** — click start + end; in-range highlight, start/end indicators
- **Holiday markers** — red dots on 15 holidays with tooltips
- **Integrated notes** — month notes + range notes, saved to `localStorage`
- **4 color themes** — Paper, Dark, Sage, Rose
- **Fully responsive** — side-by-side desktop, stacked mobile

---

## 📁 Project Structure

```
wall-calendar/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css              ← CSS variables & keyframes
│   ├── components/
│   │   ├── Calendar.jsx       ← Main container + theme logic
│   │   ├── HeroImage.jsx      ← Photo + chevrons + navigation
│   │   ├── CalendarGrid.jsx   ← Date grid + range selection
│   │   ├── CalendarRings.jsx  ← Animated spiral rings
│   │   ├── NotesSection.jsx   ← Month/range notes + localStorage
│   │   └── ThemeSwitcher.jsx  ← Color theme dots
│   ├── hooks/
│   │   └── useCalendar.js     ← All calendar state & logic
│   └── utils/
│       └── constants.js       ← Images, holidays, themes, helpers
```

---

## 🎨 Customization

- **Photos**: Edit `MONTH_IMAGES` in `src/utils/constants.js`
- **Holidays**: Edit `HOLIDAYS` object in `src/utils/constants.js`
- **Themes**: Add entries to `THEMES` in `src/utils/constants.js` and `ThemeSwitcher.jsx`

---

## 🔧 Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Build for production → `dist/` folder |
| `npm run preview` | Preview production build |
