//language translater component tools
//
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageCombo } from "./SelectLanguage";
import CustomTextArea from "./CustomTextArea";
import ProgressBar from "./ProgressBar";

interface languageTranslation {
  src_lang: string;
  tgt_lang: string;
}
export default function LanguageTranslator() {
  const [isLoading, setIsLoading] = useState("Translate");
  const [languageTranslation, setLanguageTranslation] =
    useState<languageTranslation>({ src_lang: "", tgt_lang: "" });
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const worker = useRef<Worker | null>(null);
  function setSrcLang(lang: string) {
    setLanguageTranslation((previous) => {
      return { ...previous, src_lang: lang };
    });
  }
  function setTarLang(lang: string) {
    setLanguageTranslation((previous) => {
      return { ...previous, tgt_lang: lang };
    });
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../workers/translatorWorker.js", import.meta.url),
        {
          type: "module",
        },
      );
    }

    const on_message_recevied = (e) => {
      console.log("state", e.data.status);
      switch (e.data.status) {
        case "initiate":
          setIsLoading("Initate");
          break;
        case "progress":
          setIsLoading("Progress");
          break;
        case "complete":
          setIsLoading("Translate");
          setOutputText(e.data.output[0]?.translation_text);
          break;
      }
    };
    worker.current.addEventListener("message", on_message_recevied);

    return () =>
      worker.current.removeEventListener("message", on_message_recevied);
  }, []);

  const translateText = useCallback(
    (text: string, { src_lang, tgt_lang }: languageTranslation) => {
      if (worker.current) {
        worker.current.postMessage({
          text,
          src_lang: src_lang,
          tgt_lang: tgt_lang,
        });
      }
    },
    [],
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="flow space-y-4">
          <LanguageCombo
            Lang={languageTranslation.src_lang}
            setLang={setSrcLang}
          />
          <textarea
            id="left"
            className="w-full p-4 border-2 border-black font-medium focus:ring-4 focus:ring-yellow-400 outline-none"
            placeholder="Enter text to transform..."
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="flow space-y-4">
          <LanguageCombo
            Lang={languageTranslation.tgt_lang}
            setLang={setTarLang}
          />
          <textarea
            id="right"
            className="w-full p-4 border-2 border-black font-medium focus:ring-4 focus:ring-yellow-400 outline-none"
            placeholder="Transform text..."
            rows={4}
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
          />
        </div>
      </div>
      {isLoading === "Translate" ? (
        <button
          onClick={(e) =>
            translateText(inputText, {
              src_lang: languageTranslation.src_lang,
              tgt_lang: languageTranslation.tgt_lang,
            } as languageTranslation)
          }
          className="w-full bg-black text-yellow-400 py-3 font-black text-xl disabled:opacity-50"
        >
          Translate
        </button>
      ) : (
        <ProgressBar />
      )}
    </div>
  );
}
