
import { LoginButton } from '@/components/login-button'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      
      <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-md w-full border border-white/50 ring-1 ring-white/60">
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform rotate-3 hover:rotate-6 transition-all duration-500 ease-out hover:scale-105">
            <svg
              className="w-10 h-10 text-white"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            SmartMarks
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Beautifully organized bookmarks. <br/>
            Simple. Private. Real-time.
          </p>
        </div>
        
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-4">
        <p className="text-gray-500 text-sm font-medium">
          Designed with <span className="text-red-400">♥</span> for productivity
        </p>
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400 font-medium tracking-wide">
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <a href="#" className="hover:text-gray-600 transition-colors">Help & Support</a>
        </div>
        <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-6">
          © {new Date().getFullYear()} SmartMarks Inc.
        </p>
      </div>
    </div>
  )
}
