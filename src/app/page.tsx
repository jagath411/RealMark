
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BookmarkManager } from '@/components/bookmark-manager'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1.5 transform -rotate-3 hover:rotate-0 transition-all">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              SmartMarks
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                {user.email?.[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.email}
              </span>
            </div>
            
            <form action="/auth/signout" method="post">
              <button
                className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                type="submit"
                formAction={async () => {
                  'use server'
                  const supabase = await createClient()
                  await supabase.auth.signOut()
                  redirect('/login')
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <BookmarkManager 
          initialBookmarks={bookmarks ?? []} 
          userId={user.id} 
        />
      </div>
    </main>
  )
}
