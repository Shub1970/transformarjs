"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRequest } from "@/lib/apicall";

interface Languages {
  language: string;
  language_code: string;
}
interface getLanguages {
  count: number;
  data: Languages[];
}
export function LanguageCombo({ Lang, setLang }) {
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<Languages[]>([]);

  const fetchLanguages = useCallback(async () => {
    const response: getLanguages = await getRequest("/api/languages");
    setDatas(response.data);
  }, []);
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-white text-black border-2 border-black px-8 py-4 text-l font-bold hover:scale-105 transition-transform"
        >
          {Lang
            ? datas.find((data) => data.language_code === Lang)?.language
            : "Select language..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {datas.length &&
                datas.map((lang) => (
                  <CommandItem
                    key={lang.language_code}
                    value={lang.language_code}
                    className="bg-white text-black border-1 border-black"
                    onSelect={(currentValue) => {
                      setLang(currentValue === Lang ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {lang.language}
                    <Check
                      className={cn(
                        "ml-auto",
                        Lang === lang.language_code
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
