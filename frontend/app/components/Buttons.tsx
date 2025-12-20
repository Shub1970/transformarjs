export default function Button({ label }: { label: string }) {
  return (
    <button className="px-5 py-2  rounded-lg bg-indigo-600 inline-flex items-center justify-center font-medium">
      {label}
    </button>
  );
}
