import Link from "next/link";
import { Code2, LogIn, LogOut } from "lucide-react";
import { NavAuth } from "./NavAuth";

export default function NavBar() {
  function isActive(nav: string) {
    return false;
  }
  return (
    <nav className="sticky top-0 z-40 bg-black text-yellow-400 p-4 border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-black italic tracking-tighter flex items-center gap-2"
        >
          <span className="bg-yellow-400 text-black px-1">TRANSFORMERS</span>
          <span>JS</span>
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
            href="/blogs"
            className={`${isActive("/chatbot") ? "underline" : "hover:opacity-70"}`}
          >
            BLOGS
          </Link>
        </div>
        <NavAuth />
      </div>
    </nav>
  );
}
