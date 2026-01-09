"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/providers/auth-provider";
import React, { useRef, useEffect, useState, useCallback } from "react";

export default function ImageProcessing() {
  const { incrementUserCount } = useAuthStore((state) => state);
  const [progress, setProgress] = useState("idle");
  const [imageURL, setImageURL] = useState("");
  const [imageData, setImageData] = useState<any>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false); // Track drag state
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../workers/backgroundRemoving.js", import.meta.url),
        { type: "module" },
      );
    }

    const handleProgress = (e: MessageEvent) => {
      switch (e.data.status) {
        case "initial":
          setProgress("processing");
          break;
        case "complete":
          setImageData(e.data.output[0]);
          setProgress("complete");
          break;
      }
    };

    worker.current.addEventListener("message", handleProgress);
    return () => worker.current?.removeEventListener("message", handleProgress);
  }, []);

  useEffect(() => {
    async function updateFeature(feat: string = "BACKGROUNDREMOVE") {
      const body = {
        feature: feat,
      };
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/features`,
          {
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          const error = await response.text();
          console.log(`error while updating feature usage: ${error}`);
        }

        incrementUserCount();
      } catch (err) {
        console.log("error while sending feature update");
      }
    }

    if (progress === "complete") {
      updateFeature();
    }
  }, [progress]);

  useEffect(() => {
    if (!imageData) return;
    const { data, width, height } = imageData;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgDataObj = new ImageData(
      new Uint8ClampedArray(data),
      width,
      height,
    );
    ctx.putImageData(imgDataObj, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        if (imageURL) URL.revokeObjectURL(imageURL);
        const url = URL.createObjectURL(blob);
        setImageURL(url);
      }
    });
  }, [imageData]);

  // Unified file processing logic
  const processFile = (file: File) => {
    const validType = ["image/jpeg", "image/png"];
    if (!validType.includes(file.type)) {
      setError("Please select a JPG or PNG image.");
      return;
    }
    setError("");
    const url = URL.createObjectURL(file);
    setImageURL(url);
    if (worker.current) {
      worker.current.postMessage({ url });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  // Drag handlers
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(true);
  }
  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4">
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      {!imageURL && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative text-center py-12 border-2 border-dashed transition-all duration-200
            ${isDragging ? "border-yellow-400 bg-yellow-50 scale-[1.02]" : "border-black bg-white"}
          `}
        >
          <p className="font-bold mb-4 uppercase">
            {isDragging ? "Drop it now!" : "Drag & Drop Image Here"}
          </p>

          <input
            type="file"
            className="hidden"
            id="file-upload"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file-upload"
            className="bg-black text-white px-6 py-2 cursor-pointer font-bold hover:bg-yellow-400 hover:text-black transition-colors"
          >
            BROWSE FILES
          </label>
        </div>
      )}

      {imageURL && (
        <div className="image border rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <img src={imageURL} alt="Output" className="w-full h-auto rounded" />
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setImageURL("");
                setImageData(null);
                setProgress("idle");
              }}
            >
              Reset
            </Button>
            {progress === "processing" && (
              <span className="text-sm animate-pulse flex items-center">
                Processing...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
