'use client'
import { formatDateDisplay, daysBetween } from '../utils/dateHelpers'
import styles from './NotesPanel.module.css'

export default function NotesPanel({ rangeStart, rangeEnd, currentNote, onNoteChange, savedFlash, onClearSelection }) {
  const lo = rangeStart && rangeEnd ? (rangeStart <= rangeEnd ? rangeStart : rangeEnd) : rangeStart
  const hi = rangeStart && rangeEnd ? (rangeStart <= rangeEnd ? rangeEnd : rangeStart) : null
  const days = daysBetween(lo, hi)

  return (
    <div className={styles.panel}>
      <div className={styles.selectionBar}>
        {!rangeStart ? (
          <span className={styles.hint}>Click a date to start selecting</span>
        ) : !hi || lo?.getTime() === hi?.getTime() ? (
          <span className={styles.selText}>
            <span className={styles.dot} style={{ background: 'var(--blue)' }} />
            {formatDateDisplay(lo)}
          </span>
        ) : (
          <span className={styles.selText}>
            <span className={styles.dot} style={{ background: 'var(--blue)' }} />
            {formatDateDisplay(lo)} → {formatDateDisplay(hi)}
            <span className={styles.badge}>{days}d</span>
          </span>
        )}
        {rangeStart && (
          <button className={styles.clearBtn} onClick={onClearSelection} title="Clear selection">✕</button>
        )}
      </div>

      <div className={styles.notesSection}>
        <div className={styles.notesHeader}>
          <span className={styles.notesLabel}>Notes</span>
          <span className={`${styles.saved} ${savedFlash ? styles.savedVisible : ''}`}>✓ saved</span>
        </div>
        <div className={styles.linesWrapper}>
          <textarea
            className={styles.textarea}
            value={currentNote}
            onChange={e => onNoteChange(e.target.value)}
            placeholder="Write your notes here…"
            rows={5}
          />
          <div className={styles.lines} aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.line} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
