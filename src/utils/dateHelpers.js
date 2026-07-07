export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

export const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday-based
}

export function isSameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

export function isInRange(date, start, end) {
  if (!start || !end) return false
  const lo = start <= end ? start : end
  const hi = start <= end ? end : start
  return date >= lo && date <= hi
}

export function isRangeStart(date, start, end) {
  if (!start) return false
  const lo = end && start > end ? end : start
  return isSameDay(date, lo)
}

export function isRangeEnd(date, start, end) {
  if (!start || !end || isSameDay(start, end)) return false
  const hi = start <= end ? end : start
  return isSameDay(date, hi)
}

export function formatDateDisplay(date) {
  if (!date) return ''
  return `${MONTHS[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`
}

export function daysBetween(start, end) {
  if (!start || !end) return 0
  return Math.abs(Math.round((end - start) / 86400000)) + 1
}

export function noteKey(year, month) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}
