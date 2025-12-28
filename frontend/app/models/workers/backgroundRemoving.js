//background removing
import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

class imagePipelineSingleTone {
  static task = "background-removal";
  static model = "Xenova/modnet";
  static instance = null;
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  self.postMessage({ status: "initiate" });
  let back_ground_removal = await imagePipelineSingleTone.getInstance((x) => {
    self.postMessage(x);
  });
  const url = event.data.url;

  const output = await back_ground_removal(url);
  self.postMessage({ status: "complete", output: output });
});
