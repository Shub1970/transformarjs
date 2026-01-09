export default function Blogs() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-16">
          {/* Hero */}
          <section className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              Transformers <br />
              In The Browser
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              How I used Transformers.js, Web Workers, and Next.js to run real
              translation models directly on the client — no server required.
            </p>
          </section>

          <section className="border-t-4 border-black pt-12 space-y-6">
            <h2 className="text-4xl font-black uppercase">
              Why Transformers.js?
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
              Transformers.js allows you to run Hugging Face models directly in
              the browser using WebAssembly and ONNX. This means faster
              feedback, improved privacy, and zero inference cost for basic
              tasks like translation.
            </p>
          </section>

          <section className="border-t-4 border-black pt-12 space-y-6">
            <h2 className="text-4xl font-black uppercase">
              1. Updating Next.js Configuration
            </h2>

            <p className="text-lg opacity-90">
              Since Transformers.js runs fully on the client, we need to disable
              certain Node-only dependencies like <code>sharp</code> and
              <code>onnxruntime-node</code>.
            </p>

            <pre className="bg-black text-yellow-400 p-6 overflow-x-auto text-sm border-4 border-black">
              <code>{`
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default nextConfig;
              `}</code>
            </pre>
          </section>

          {/* Step 2 */}
          <section className="border-t-4 border-black pt-12 space-y-6">
            <h2 className="text-4xl font-black uppercase">
              2. Creating a Translation Worker
            </h2>

            <p className="text-lg opacity-90">
              Heavy ML models should never block the main thread. I used a Web
              Worker to load and execute the translation pipeline.
            </p>

            <pre className="bg-white p-6 overflow-x-auto text-sm border-4 border-black text-black">
              <code>{`
import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

class PipelineSingleton {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  self.postMessage({ status: "progress" });

  const translator = await PipelineSingleton.getInstance((x) => {
    self.postMessage(x);
  });

  self.postMessage({ status: "pipeline constructed" });

  const output = await translator(event.data.text, {
    src_lang: event.data?.src_lang || "eng_Latn",
    tgt_lang: event.data?.tgt_lang || "hin_Deva",
  });

  self.postMessage({ status: "complete", output });
});
              `}</code>
            </pre>
          </section>

          {/* Step 3 */}
          <section className="border-t-4 border-black pt-12 space-y-6">
            <h2 className="text-4xl font-black uppercase">
              3. Connecting the Worker in React
            </h2>

            <p className="text-lg opacity-90">
              The worker is initialized once inside <code>useEffect</code> and
              communicates with the UI via message events.
            </p>

            <pre className="bg-black text-yellow-400 p-6 overflow-x-auto text-sm border-4 border-black">
              <code>{`
useEffect(() => {
  if (!worker.current) {
    worker.current = new Worker(
      new URL("../workers/translatorWorker.js", import.meta.url),
      { type: "module" }
    );
  }

  const onMessageReceived = (e) => {
    switch (e.data.status) {
      case "progress":
        setIsLoading("Progress");
        break;
      case "complete":
        setIsLoading("Complete");
        setOutputText(e.data.output[0]?.translation_text);
        break;
    }
  };

  worker.current.addEventListener("message", onMessageReceived);

  return () =>
    worker.current.removeEventListener("message", onMessageReceived);
}, []);
              `}</code>
            </pre>
          </section>

          {/* Closing */}
          <section className="border-t-4 border-black pt-12 space-y-6">
            <h2 className="text-4xl font-black uppercase">Final Thoughts</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Running Transformers directly in the browser unlocks an entirely
              new class of privacy-first and cost-efficient applications. With
              Web Workers handling the heavy lifting, the UI stays responsive
              while powerful models run silently in the background.
            </p>

            <p className="font-bold">
              Reference:{" "}
              <a
                href="https://huggingface.co/docs/transformers.js/en/tutorials/next"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hugging Face Transformers.js – Next.js Guide
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
