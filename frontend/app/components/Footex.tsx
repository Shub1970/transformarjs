export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-2 text-center text-sm z-50">
      <span className="opacity-70">Guest Mode:</span> 0 / 5 transformations
      used.
      <button className="ml-4 underline font-bold hover:text-yellow-400 transition-colors">
        Upgrade to Pro
      </button>
    </footer>
  );
}
