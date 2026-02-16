
'use client'

import { Bookmark } from '@/types'
import { Trash2, ExternalLink, BookOpen } from 'lucide-react'

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDelete: (id: string) => Promise<void>
}

export function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-500 text-lg font-medium">No bookmarks yet</p>
        <p className="text-gray-400 text-sm mt-1">Start by adding your first bookmark above.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="group relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
        >
          <div className="flex flex-col h-full justify-between gap-4">
            <div>
              <div className="flex justify-between items-start gap-3">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1 flex-1 text-lg mb-1"
                >
                  {bookmark.title}
                </a>
              </div>
              <p className="text-xs text-gray-400 font-mono truncate max-w-full bg-gray-50 p-1 px-2 rounded-md inline-block">
                {new URL(bookmark.url).hostname}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 hover:underline"
              >
                Visit Site
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <button
                onClick={() => onDelete(bookmark.id)}
                className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
