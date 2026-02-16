
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
    <main className="min-h-screen flex flex-col font-sans">
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl px-6 py-4 flex justify-between items-center transition-all hover:bg-white/80 hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-2 shadow-sm">
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
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              SmartMarks
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] shadow-sm">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-900 font-bold text-xs">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
            </div>
            
            <form action="/auth/signout" method="post">
              <button
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition-all hover:bg-red-50 px-4 py-2 rounded-xl"
                type="submit"
                formAction={async () => {
                  'use server'
                  const supabase = await createClient()
                  await supabase.auth.signOut()
                  redirect('/login')
                }}
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <BookmarkManager 
          initialBookmarks={bookmarks ?? []} 
          userId={user.id} 
        />
      </div>
    </main>
  )
}
