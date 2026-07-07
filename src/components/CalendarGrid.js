'use client'
import {
  DAYS_SHORT, getDaysInMonth, getFirstDayOfMonth,
  isSameDay, isInRange, isRangeStart, isRangeEnd
} from '../utils/dateHelpers'
import styles from './CalendarGrid.module.css'

export default function CalendarGrid({
  viewYear, viewMonth, today,
  rangeStart, rangeEnd,
  onDayClick, onDayHover
}) {
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1 < 0 ? 11 : viewMonth - 1)

  const cells = []

  // Previous month trailing days
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, type: 'prev' })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: 'current' })
  }

  // Next month leading days
  const trailing = (7 - (cells.length % 7)) % 7
  for (let i = 1; i <= trailing; i++) {
    cells.push({ day: i, type: 'next' })
  }

  return (
    <div className={styles.grid}>
      {DAYS_SHORT.map((label, i) => (
        <div
          key={label}
          className={`${styles.dayLabel} ${i >= 5 ? styles.weekend : ''}`}
        >
          {label}
        </div>
      ))}

      {cells.map((cell, idx) => {
        if (cell.type !== 'current') {
          return (
            <div key={`other-${idx}`} className={`${styles.cell} ${styles.otherMonth}`}>
              {cell.day}
            </div>
          )
        }

        const date = new Date(viewYear, viewMonth, cell.day)
        const dow = date.getDay() // 0=Sun
        const isWeekend = dow === 0 || dow === 6
        const isToday = isSameDay(date, today)
        const inRange = isInRange(date, rangeStart, rangeEnd)
        const isStart = isRangeStart(date, rangeStart, rangeEnd)
        const isEnd = isRangeEnd(date, rangeStart, rangeEnd)
        const isSingle = rangeStart && rangeEnd && isSameDay(rangeStart, rangeEnd) && isStart

        let cls = styles.cell
        if (isWeekend) cls += ' ' + styles.weekendDay
        if (isToday) cls += ' ' + styles.today
        if (inRange && !isStart && !isEnd) cls += ' ' + styles.inRange
        if (isStart && !isSingle) cls += ' ' + styles.rangeStart
        if (isEnd && !isSingle) cls += ' ' + styles.rangeEnd
        if (isSingle || (isStart && !rangeEnd)) cls += ' ' + styles.singleSelected

        return (
          <div
            key={`day-${cell.day}`}
            className={cls}
            onClick={() => onDayClick(date)}
            onMouseEnter={() => onDayHover && onDayHover(date)}
            role="button"
            tabIndex={0}
            aria-label={date.toDateString()}
            onKeyDown={e => e.key === 'Enter' && onDayClick(date)}
          >
            <span className={styles.dayNum}>{cell.day}</span>
            {isToday && <span className={styles.todayDot} />}
          </div>
        )
      })}
    </div>
  )
}
