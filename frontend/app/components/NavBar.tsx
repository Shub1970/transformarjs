import Link from "next/link";
import { Code2, LogIn, LogOut } from "lucide-react";

export default function NavBar() {
  function isActive(nav: string) {
    return nav === "/";
  }
  return (
    <nav className="sticky top-0 z-40 bg-black text-yellow-400 p-4 border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-black italic tracking-tighter flex items-center gap-2"
        >
          <span className="bg-yellow-400 text-black px-1">TRANSFORM</span>
          <span>.JS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-bold">
          <Link
            href="/"
            className={`${isActive("/") ? "underline" : "hover:opacity-70"}`}
          >
            START
          </Link>
          <Link
            href="/models"
            className={`${isActive("/models") ? "underline" : "hover:opacity-70"}`}
          >
            MODELS
          </Link>
          <Link
            href="/chatbot"
            className={`${isActive("/chatbot") ? "underline" : "hover:opacity-70"}`}
          >
            CHAT
          </Link>
          <Link
            href="/image-gen"
            className={`${isActive("/image-gen") ? "underline" : "hover:opacity-70"}`}
          >
            GENERATE
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-70 hidden sm:block"></span>
            <button className="bg-yellow-400 text-black px-4 py-1 rounded-sm text-sm font-bold border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-all">
              LOGOUT
            </button>
          </div>
          ) : (
          <button className="bg-yellow-400 text-black px-4 py-1 rounded-sm text-sm font-bold border-2 border-yellow-400 hover:bg-black hover:text-yellow-400 transition-all">
            LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
}
