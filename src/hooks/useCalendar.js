'use client'
import { useState, useCallback } from 'react'

export function useCalendar() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)
  const [selecting, setSelecting] = useState(false)
  const [hoverDate, setHoverDate] = useState(null)

  const goToPrev = useCallback(() => {
    setViewMonth(m => {
      if (m === 0) { setViewYear(y => y - 1); return 11 }
      return m - 1
    })
  }, [])

  const goToNext = useCallback(() => {
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0 }
      return m + 1
    })
  }, [])

  const goToToday = useCallback(() => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
  }, [])

  const handleDayClick = useCallback((date) => {
    if (!selecting || !rangeStart) {
      setRangeStart(date)
      setRangeEnd(null)
      setSelecting(true)
    } else {
      setRangeEnd(date)
      setSelecting(false)
      setHoverDate(null)
    }
  }, [selecting, rangeStart])

  const clearSelection = useCallback(() => {
    setRangeStart(null)
    setRangeEnd(null)
    setSelecting(false)
    setHoverDate(null)
  }, [])

  const effectiveEnd = selecting ? hoverDate : rangeEnd

  return {
    today,
    viewYear, viewMonth,
    rangeStart, rangeEnd: effectiveEnd,
    selecting,
    hoverDate, setHoverDate,
    goToPrev, goToNext, goToToday,
    handleDayClick, clearSelection,
  }
}
