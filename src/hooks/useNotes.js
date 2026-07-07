'use client'
import { useState, useEffect, useCallback } from 'react'
import { noteKey } from '../utils/dateHelpers'

export function useNotes(viewYear, viewMonth) {
  const [notes, setNotes] = useState({})
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wall-calendar-notes')
      if (stored) setNotes(JSON.parse(stored))
    } catch {}
  }, [])

  const currentKey = noteKey(viewYear, viewMonth)
  const currentNote = notes[currentKey] || ''

  const updateNote = useCallback((value) => {
    setNotes(prev => {
      const updated = { ...prev, [noteKey(viewYear, viewMonth)]: value }
      try { localStorage.setItem('wall-calendar-notes', JSON.stringify(updated)) } catch {}
      return updated
    })
    setSavedFlash(false)
    setTimeout(() => setSavedFlash(true), 10)
    setTimeout(() => setSavedFlash(false), 1500)
  }, [viewYear, viewMonth])

  return { currentNote, updateNote, savedFlash }
}
