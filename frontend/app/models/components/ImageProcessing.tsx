//image processing

import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState, useCallback } from "react";

export default function ImageProcessing() {
  const [progress, setProgress] = useState("transform");
  const [imageData, setImageData] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const worker = useRef<Worker | null>(null);
  const canvasref = useRef(null);
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../workers/backgroundRemoving.js", import.meta.url),
        {
          type: "module",
        },
      );
    }

    const handlePogress = (e) => {
      switch (e.data.status) {
        case "initial":
          setProgress("initial");
          break;
        case "complete":
          console.log("data", e.data.output[0]);
          setImageData(e.data.output[0]);
          setProgress("complete");
          break;
      }
    };

    worker.current?.addEventListener("message", handlePogress);

    return () => {
      worker.current?.removeEventListener("message", handlePogress);
      // worker.current?.terminate();
      // worker.current = null;
    };
  }, []);

  useEffect(() => {
    if (!imageData || !canvasref.current) return;

    const { data, width, height } = imageData;

    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = new ImageData(new Uint8ClampedArray(data), width, height);

    ctx.putImageData(imgData, 0, 0, width, height);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setImageURL(url);
    });
    // clear previous canvas
  }, [imageData]);

  const handleFunc = useCallback(() => {
    if (worker.current) {
      worker.current.postMessage("hellw");
    }
  }, []);
  return (
    <div className="space-y-4">
      {!imageData && (
        <div className="space-y-4">
          <div className="text-center py-12 border-2 border-dashed border-black">
            <p className="font-bold mb-4">DRAG & DROP IMAGE HERE</p>
            <input type="file" className="hidden" id="file-upload" />
            <label
              htmlFor="file-upload"
              className="bg-black text-white px-6 py-2 cursor-pointer font-bold hover:bg-yellow-400 hover:text-black transition-colors"
            >
              BROWSE FILES
            </label>
          </div>
          <Button onClick={() => handleFunc()}>start worker</Button>
        </div>
      )}
      {imageURL !== "" && (
        <div className="image">
          <img src={imageURL} />
        </div>
      )}
    </div>
  );
}
