"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Buttons";
import TextEditor from "./components/TextEditor";
import { language_data } from "../data/languageList";
import type { LanguageData } from "../data/languageList";
import TranslationText from "./components/TranslationText";
interface content {
  textContent: string;
  textConverter: string;
}

export default function Editor() {
  const [language, setLanguage] = useState<Array<LanguageData>>(language_data);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData>({
    language: "Hindi",
    language_code: "hin_Deva",
  });
  const [content, setContent] = useState({ textContent: "", htmlContent: "" });
  const [modelStatus, setModelStatus] = useState("idle");
  const worker = useRef<Worker | null>(null);

  function textUpdate(text: string) {
    setContent((data) => ({ ...data, textContent: text }));
  }

  function htmlUpdate(text: string) {
    setContent((data) => ({ ...data, htmlContent: text }));
  }

  function updateSelectdLanguage(code: string) {
    const filterLanguage = language.filter(
      (lang) => lang.language_code === code,
    );
    setSelectedLanguage(filterLanguage[0]);
  }

  useEffect(() => {
    if (worker.current === null) {
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "initialize worker":
          setModelStatus("initialize worker");
          break;
        case "pipline constracted":
          setModelStatus("pipline constracted");
          break;
        case "translation complete":
          setModelStatus("translation complete");
          htmlUpdate(e.data.output[0].translation_text);
          break;
      }
    };
    worker.current.addEventListener("message", onMessageReceived);
    return () =>
      worker.current?.removeEventListener("message", onMessageReceived);
  });
  const translater = (text: string) => {
    if (worker.current) {
      worker.current.postMessage({
        text: text,
        input_language: "eng_Latn",
        output_language: selectedLanguage.language_code,
      });
    }
  };

  return (
    <>
      <div className="Action-center | bg-slate-800 border-slate-700 p-4 flex justify-between items-center border-slate-700">
        <div className="text-white flex items-center gap-4">
          <span>Editor Environment</span>
          <span className={`px-2 py-1 text-xs rounded`}>
            Worker: {modelStatus}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="selected-language-form">
            <label htmlFor="selected-language" className="form-label">
              Select Language
            </label>
            <select
              id="selected-language"
              name="selected-language"
              className="form-control"
              value={selectedLanguage.language_code}
              onChange={(e) => updateSelectdLanguage(e.target.value)}
            >
              {language.map((lang, index) => {
                return (
                  <option key={index} value={lang.language_code}>
                    {lang.language}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={() => translater(content.textContent)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Translate
          </button>
        </div>
      </div>
      <div className="p-5 grid gap-4 grid-cols-2 h-full w-full min-h-[80vh] relative overflow-clip">
        <TextEditor value={content.textContent} isHandle={textUpdate} />
        <TranslationText
          value={content.htmlContent}
          hasTranslated={selectedLanguage.language}
          isHandle={htmlUpdate}
        />
      </div>
    </>
  );
}
