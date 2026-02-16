
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { BookmarkList } from './bookmark-list'
import { AddBookmarkForm } from './add-bookmark-form'
import { Bookmark } from '@/types' 

interface BookmarkManagerProps {
  initialBookmarks: Bookmark[]
  userId: string
}

export function BookmarkManager({ initialBookmarks, userId }: BookmarkManagerProps) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)
  const supabase = createClient()

  useEffect(() => {
    setBookmarks(initialBookmarks)
  }, [initialBookmarks])

  useEffect(() => {
    const channel = supabase
      .channel('realtime bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => {
              if (prev.some((b) => b.id === payload.new.id)) return prev
              return [payload.new as Bookmark, ...prev]
            })
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, userId])

  const handleAdd = async (url: string, title: string) => {
    try {
      new URL(url) // Validate URL format
    } catch {
      alert('Invalid URL format. Please include http:// or https://')
      return
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        user_id: userId,
      })
      .select()
      .single()

    if (error) {
       console.error('Error adding bookmark:', error)
       alert('Error adding bookmark: ' + error.message)
       return
    }

    // Optimistically update if successful (deduplicated by ID in the list render or here)
    if (data) {
      setBookmarks((prev) => {
        if (prev.some((b) => b.id === data.id)) return prev
        return [data, ...prev]
      })
    }
  }

  const handleDelete = async (id: string) => {
    const originalBookmarks = [...bookmarks]
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))

    const { error } = await supabase.from('bookmarks').delete().eq('id', id)

    if (error) {
      console.error('Error deleting bookmark:', error)
      setBookmarks(originalBookmarks)
      alert('Error deleting bookmark')
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AddBookmarkForm onAdd={handleAdd} />
      <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
    </div>
  )
}
