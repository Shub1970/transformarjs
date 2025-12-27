import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

class PipelineSingleton {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M";
  static instance = null;
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  self.postMessage({ status: "progress" });
  let translator = await PipelineSingleton.getInstance((x) => {
    self.postMessage(x);
  });
  self.postMessage({ status: "pipline constracted" });
  let output = await translator(event.data.text, {
    src_lang: event.data?.src_lang || "eng_Latn",
    tgt_lang: event.data?.tgt_lang || "hin_Deva",
  });

  self.postMessage({ status: "complete", output: output });
});
