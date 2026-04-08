import { useState, useCallback } from 'react'

export function useCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd,   setRangeEnd]   = useState(null)
  const [hoverDate,  setHoverDate]  = useState(null)
  const [selecting,  setSelecting]  = useState(false)
  const [flipping,   setFlipping]   = useState(false)

  const year  = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const raw = new Date(year, month, 1).getDay()
  const firstDay = raw === 0 ? 6 : raw - 1   // Monday-based

  const navigateMonth = useCallback(dir => {
    setFlipping(true)
    setTimeout(() => {
      setCurrentDate(p => new Date(p.getFullYear(), p.getMonth() + dir, 1))
      setFlipping(false)
    }, 380)
  }, [])

  const handleDayClick = useCallback(day => {
    const clicked = new Date(year, month, day)
    if (!selecting || !rangeStart) {
      setRangeStart(clicked); setRangeEnd(null); setSelecting(true)
    } else {
      if (clicked < rangeStart) { setRangeEnd(rangeStart); setRangeStart(clicked) }
      else                       { setRangeEnd(clicked) }
      setSelecting(false)
    }
  }, [selecting, rangeStart, year, month])

  const clearSelection = useCallback(() => {
    setRangeStart(null); setRangeEnd(null); setSelecting(false)
  }, [])

  const _endForRange = rangeEnd || (selecting && hoverDate)

  const isInRange = useCallback(day => {
    const date = new Date(year, month, day)
    if (!rangeStart || !_endForRange) return false
    const lo = rangeStart < _endForRange ? rangeStart : _endForRange
    const hi = rangeStart < _endForRange ? _endForRange : rangeStart
    return date > lo && date < hi
  }, [rangeStart, _endForRange, year, month])

  const isRangeStart = useCallback(day =>
    rangeStart && rangeStart.getFullYear()===year && rangeStart.getMonth()===month && rangeStart.getDate()===day
  , [rangeStart, year, month])

  const isRangeEnd = useCallback(day =>
    rangeEnd && rangeEnd.getFullYear()===year && rangeEnd.getMonth()===month && rangeEnd.getDate()===day
  , [rangeEnd, year, month])

  const isToday = useCallback(day =>
    today.getFullYear()===year && today.getMonth()===month && today.getDate()===day
  , [year, month])

  const isWeekend = useCallback(day => {
    const d = new Date(year, month, day).getDay()
    return d === 0 || d === 6
  }, [year, month])

  return {
    year, month, daysInMonth, firstDay,
    rangeStart, rangeEnd, hoverDate, selecting, flipping,
    navigateMonth, handleDayClick, clearSelection,
    isInRange, isRangeStart, isRangeEnd, isToday, isWeekend, setHoverDate,
  }
}
