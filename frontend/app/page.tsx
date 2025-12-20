import Image from "next/image";
import {
  Shield,
  Zap,
  Lock,
  ArrowRight,
  User,
  UserCheck,
  Github,
  Loader2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Focused • No Data Storage
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
            Convert Text to HTML <br />
            <span className="text-indigo-500">Securely in Your Browser</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instantly transform plain text or markdown into semantic, clean
            HTML5 code using advanced AI. We prioritize your privacy—your data
            never leaves the session context.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 mt-10">
            {/* Guest Option */}
            <div className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-8 rounded-2xl transition-all duration-300 w-full sm:w-80 flex flex-col items-center">
              <div className="bg-slate-700 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Try as Guest
              </h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">
                Perfect for quick tasks. Limited to 5 free conversions per
                session.
              </p>
            </div>

            {/* Login Option */}
            <div className="group relative bg-indigo-900/20 hover:bg-indigo-900/30 border border-indigo-500/30 p-8 rounded-2xl transition-all duration-300 w-full sm:w-80 flex flex-col items-center shadow-lg shadow-indigo-500/10">
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <div className="bg-indigo-600 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Unlimited Access
              </h3>
              <p className="text-indigo-200 text-sm mb-6">
                Login for unlimited conversions and no restrictions.
              </p>

              <div className="w-full space-y-3 mt-auto">
                <button className="w-full bg-white text-gray-800 hover:bg-gray-100 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  <div>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Privacy Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            {`How it works & Why it's safe`}
          </h2>
          <p className="mt-4 text-slate-400">Transparency is our core value.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Zero Data Storage
            </h3>
            <p className="text-slate-400 leading-relaxed">
              We do not persist your input text or the generated HTML in any
              database. Once you close the browser tab, the data is gone
              forever.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Gemini AI Powered
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Utilizing Googles Gemini Flash model for lightning-fast,
              context-aware conversions that respect semantic HTML structures.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Instant Preview
            </h3>
            <p className="text-slate-400 leading-relaxed">
              See the results immediately. Copy the raw code or view the
              rendered HTML side-by-side with your input.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
