interface ComTrans {
  value: string;
  hasTranslated: string;
  isHandle: (text: string) => void;
}

export default function TranslationText({
  value,
  hasTranslated,
  isHandle,
}: ComTrans) {
  return (
    <div className="border-slate-700 border-1">
      <p className="p-1 text-xl ">Translated to {hasTranslated}</p>
      <textarea
        name="simpleText"
        value={value}
        onChange={(e) => isHandle(e.target.value)}
        className="block w-full h-full bg-cyan-50 mt-2 p-2 text-black"
      ></textarea>
    </div>
  );
}
