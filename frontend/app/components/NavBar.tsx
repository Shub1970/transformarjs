import Link from "next/link";

import { Code2, LogIn, LogOut } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              AI Html<span className="text-indigo-400">Converter</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
              <span className="text-xs text-slate-400">
                Guest Limit:{" "}
                <span className="text-indigo-400 font-bold">
                  remainingGuestConversions
                </span>{" "}
                left
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-slate-800/50 py-1.5 px-3 rounded-full border border-slate-700">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-none"></span>
                  <span className="text-[10px] text-slate-400 leading-none mt-0.5">
                    Premium
                  </span>
                </div>
              </div>
              <button
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
