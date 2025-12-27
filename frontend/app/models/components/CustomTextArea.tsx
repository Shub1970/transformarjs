"use client";
import { useState } from "react";
import { LanguageCombo } from "./SelectLanguage";
export default function CustomTextArea({ uniqID }: { uniqID: string }) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  return (
    <div
      className={uniqID === "left" ? "flow flex flex-col justify-end" : "flow"}
    >
      <LanguageCombo />
      <textarea
        id={uniqID}
        className="w-full p-4 border-2 border-black font-medium focus:ring-4 focus:ring-yellow-400 outline-none"
        placeholder="Enter text to transform..."
        rows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}
