'use client'
import { MONTHS } from '../utils/dateHelpers'
import { useCalendar } from '../hooks/useCalendar'
import { useNotes } from '../hooks/useNotes'
import HeroPanel from './HeroPanel'
import CalendarGrid from './CalendarGrid'
import NotesPanel from './NotesPanel'
import styles from './WallCalendar.module.css'

export default function WallCalendar() {
  const {
    today, viewYear, viewMonth,
    rangeStart, rangeEnd, selecting,
    setHoverDate,
    goToPrev, goToNext, goToToday,
    handleDayClick, clearSelection,
  } = useCalendar()

  const { currentNote, updateNote, savedFlash } = useNotes(viewYear, viewMonth)

  return (
    <div className={styles.outer}>
      <div className={styles.demoBanner}>
        Demo-ready branch preview for PR
      </div>

      {/* Spiral binding */}
      <div className={styles.spiral}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className={styles.coil} />
        ))}
      </div>

      <div className={styles.card}>
        {/* Left: Hero image */}
        <div className={styles.heroCol}>
          <HeroPanel viewYear={viewYear} viewMonth={viewMonth} />
        </div>

        {/* Right: Calendar panel */}
        <div className={styles.calCol}>
          {/* Nav header */}
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={goToPrev} aria-label="Previous month">‹</button>
            <div className={styles.navCenter}>
              <span className={styles.navTitle}>{MONTHS[viewMonth]} {viewYear}</span>
            </div>
            <button className={styles.todayBtn} onClick={goToToday}>Today</button>
            <button className={styles.navBtn} onClick={goToNext} aria-label="Next month">›</button>
          </div>

          {selecting && (
            <div className={styles.selectingHint}>
              Click another date to complete your selection
            </div>
          )}

          {/* Calendar grid */}
          <CalendarGrid
            viewYear={viewYear}
            viewMonth={viewMonth}
            today={today}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDayClick={handleDayClick}
            onDayHover={selecting ? setHoverDate : null}
          />

          {/* Notes */}
          <NotesPanel
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            currentNote={currentNote}
            onNoteChange={updateNote}
            savedFlash={savedFlash}
            onClearSelection={clearSelection}
          />
        </div>
      </div>
    </div>
  )
}
