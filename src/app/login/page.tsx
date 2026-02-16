
import { LoginButton } from '@/components/login-button'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2">
            Smart Bookmark
          </h1>
          <p className="text-gray-500">
            Your personal space for the web's best content. Sign in to get started.
          </p>
        </div>
        
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
      
      <div className="mt-8 text-white/60 text-sm">
        Built with Next.js, Supabase & Tailwind
      </div>
    </div>
  )
}
