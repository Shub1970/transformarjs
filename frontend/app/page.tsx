import GuestButton from "./components/GuestButton";
import GoogleButton from "./components/GoogleButton";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
            Transform <br />
            Everything.
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Harness the power of browser-native AI. Background removal,
            lightning-fast translation, and generative art all in one
            yellow-tinted workspace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GuestButton />
            <GoogleButton />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="border-4 border-black p-8 bg-white rotate-1">
            <h3 className="text-2xl font-black mb-4 uppercase">Guest Access</h3>
            <ul className="space-y-2 font-medium">
              <li>✓ No signup required</li>
              <li>✓ Basic on-device models</li>
              <li>✓ Limited to 5 uses</li>
              <li>✗ No image Generation</li>
            </ul>
          </div>
          <div className="border-4 border-black p-8 bg-black text-yellow-400 -rotate-1">
            <h3 className="text-2xl font-black mb-4 uppercase">Auth Access</h3>
            <ul className="space-y-2 font-medium">
              <li>✓ Unlimited transformations</li>
              <li>✓ Reasoning</li>
              <li>✓ Image Generation</li>
            </ul>
          </div>
        </section>

        <section className="border-t-4 border-black pt-12">
          <h2 className="text-4xl font-black uppercase mb-8">
            What is Transform.js?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">
                01
              </div>
              <h4 className="text-xl font-bold">On-Device Processing</h4>
              <p className="opacity-80">
                We use Transformers.js to run models directly in your browser.
                Your data never leaves your machine for basic tasks.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">
                02
              </div>
              <h4 className="text-xl font-bold">Gemini Pro Integration</h4>
              <p className="opacity-80">
                For complex reasoning and high-fidelity media, we tap into
                Google's latest multimodal models.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">
                03
              </div>
              <h4 className="text-xl font-bold">Minimalist Aesthetic</h4>
              <p className="opacity-80">
                Built for speed and focus. High contrast, low latency, maximum
                productivity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
