"use client";
import { useDebounce } from "@/hooks/useDebonce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

function Searchbar() {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategory ? currentCategory : null,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [value, currentCategory, pathname, debounceValue]);
  return (
    <div className="flex items-center rounded-full border border-black py-1 w-full">
      <span className="pl-2">
        <Search className="text-slate-600 w-4 h-4" />
      </span>
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="search"
        className="lg:w-[300px] px-4 border-none placeholder:text-slate-600 focus:outline-none rounded-full bg-transparent"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
