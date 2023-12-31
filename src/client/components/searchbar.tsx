import * as Icons from "@/src/client/components/icons";
import { cn } from "@/src/client/utils/cn";
import { useCallback, useState, type ChangeEvent } from "react";
import { Button } from "./ui/button";

const useSearchbarController = () => {
  const [value, setValue] = useState("");

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const reset = useCallback(() => {
    setValue("");
  }, []);

  return { value, onChange, reset };
};

export function Searchbar() {
  const { value, onChange, reset } = useSearchbarController();

  return (
    <div className="flex h-10">
      <div className="ml-8 flex flex-1 items-center rounded-l-full border border-input bg-searchbox-background pl-4 focus-within:border-blue-800 focus-within:shadow-inner">
        <input
          name="search_query"
          className="w-full bg-transparent outline-none placeholder:text-secondary-foreground"
          type="text"
          role="searchbox"
          placeholder="Search"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          tabIndex={0}
          aria-label="Search"
          aria-haspopup="false"
          aria-autocomplete="list"
          dir="ltr"
          value={value}
          onChange={onChange}
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(!value && "hidden")}
          onClick={reset}
        >
          <Icons.Clear className="h-[22px] w-[22px]" />
        </Button>
      </div>
      <button className="flex w-16 items-center justify-center rounded-r-full border border-l-0  border-input bg-accent">
        <Icons.Search className="h-6 w-6" />
      </button>
    </div>
  );
}
