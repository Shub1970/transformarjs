"use client";
import React, { useState } from "react";
import { UserState, UserRole } from "../types";
import LanguageTranslator from "./components/Translation";
import { TOOLS } from "../data/tools";
import ImageProcessing from "./components/ImageProcessing";

export default function Models() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tool = TOOLS.find((t) => t.id === selectedTool);
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b-4 border-black pb-4">
        <div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Model Vault
          </h1>
          <p className="text-xl font-bold opacity-60">
            Browser-Native & Hybrid AI Engines
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold uppercase">Usage Left</div>
          <div className="text-2xl font-black">5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTool(t.id);
            }}
            className={`text-left p-6 border-4 border-black transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
              selectedTool === t.id
                ? "bg-black text-yellow-400"
                : "bg-white text-black"
            }`}
          >
            <div className="text-4xl mb-4">{t.icon}</div>
            <h3 className="text-xl font-black uppercase mb-2">{t.name}</h3>
            <p className="text-sm opacity-80 line-clamp-2">{t.description}</p>
          </button>
        ))}
      </div>

      {selectedTool && tool && (
        <div className="border-4 border-black p-8 bg-white space-y-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black uppercase italic">
              {tool.name}
            </h2>
            <button
              onClick={() => setSelectedTool(null)}
              className="font-bold hover:underline"
            >
              CLOSE
            </button>
          </div>

          {selectedTool === "translator" && <LanguageTranslator />}

          {selectedTool === "bg-remover" && <ImageProcessing />}
        </div>
      )}
    </div>
  );
}
