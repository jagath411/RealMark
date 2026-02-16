
'use client'

import { useState } from 'react'

import { Plus, Type, Link as LinkIcon } from 'lucide-react'

export function AddBookmarkForm({ onAdd }: { onAdd: (url: string, title: string) => Promise<void> }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !title) return

    setLoading(true)
    try {
      await onAdd(url, title)
      setUrl('')
      setTitle('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 flex flex-col gap-5 transition-all hover:shadow-xl ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Plus className="w-5 h-5" />
          </div>
          Add Bookmark
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Type className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Title"
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-[1.5] relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="url"
            placeholder="https://example.com"
            className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 min-w-[100px]"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  )
}
