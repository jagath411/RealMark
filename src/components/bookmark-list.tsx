
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
      <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-900 text-xl font-semibold tracking-tight">No bookmarks yet</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
          Your collection is looking a bit empty. Add your first bookmark above to get started.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="group relative bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="flex flex-col h-full justify-between gap-5">
            <div>
              <div className="flex justify-between items-start gap-3">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 flex-1 text-lg tracking-tight"
                >
                  {bookmark.title}
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`} 
                  alt="favicon" 
                  className="w-4 h-4 rounded-sm opacity-70"
                />
                <p className="text-xs text-gray-500 font-medium truncate max-w-[150px]">
                  {new URL(bookmark.url).hostname}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100/50 mt-auto">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 font-semibold uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Open
                <ExternalLink className="w-3 h-3" />
              </a>
              
              <button
                onClick={() => onDelete(bookmark.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
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
