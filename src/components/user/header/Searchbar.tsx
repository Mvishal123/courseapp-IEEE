import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="flex items-center rounded-full border border-black py-1 w-full">
      <span className="pl-2 cursor-not-allowed">
        <Search />
      </span>
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="search"
        className="lg:w-[300px] px-4 border-none placeholder:text-slate-600 focus:outline-none rounded-full bg-transparent"
      />
    </div>
  );
}

export default Searchbar;
