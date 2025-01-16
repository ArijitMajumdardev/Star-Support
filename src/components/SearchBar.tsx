import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

type ProfileType = {
  _id: string;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
};

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProfileType[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<React.SetStateAction<any>>();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active,setActive] = useState(false)
  const handleSearch = (value : string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    
    setDebounceTimeout(
      setTimeout(async () => {
        if (!value) {
          setResults([])
          setLoading(false)
          return
        }
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
          const data = await response.json();
          console.log(data)
          setResults(data.profiles);
          setLoading(false)

        } catch (error) {
          setLoading(false)
          console.error("Error fetching search results:", error);
        } 
      },300)
    )
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value;
    setQuery(value);
    setLoading(true)

    handleSearch(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      // setResults([]); // Hide results
      // setQuery(""); // Clear search bar if desired
      setActive(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="h-16  w-96  relative " ref={containerRef}>
          {/* Search Input */}
     
        

        
      <div className="absolute w-full top-3" >
        
      <div className="relative w-full max-w-md   ">
        <input
          type="text"
          placeholder="Search creator"
          value={query}
        onChange={handleChange}

            className="w-full py-2 pl-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-100"
            
            onClick={()=>setActive(true)}
        />
        <button
          
          className="absolute right-3 top-2 text-gray-600"
        >
          <FaSearch size={24} />
        </button>
      </div>
</div>
          
{/*     
      {
        loading ? (
          <div className="-mb-16 mt-14 w-full max-w-md bg-white p-4 rounded-lg shadow-md z-50">
          <p className="text-gray-600">Loading...</p>
        </div>
        ) : (
            (results.length > 0) ? (
              <div className="-mb-16 mt-14 w-full max-w-md bg-white  p-4 rounded-lg shadow-md z-50">
              <h3 className="font-bold text-gray-700 mb-2">Search Results:</h3>
              <ul>
                {results.map((result) => (
                  <Link href={`/${result.username}`} onClick={() => {
                    setQuery(""); // Clear the search bar
                    setResults([]); // Remove search results
                  }}  key={result._id}>
                  <li
                   
                    className="py-1 px-2 hover:bg-blue-200 rounded-md cursor-pointer"
                   
                  >
                    
                    {result.username}
                  </li>
                    </Link>
                ))}
    
    
              </ul>
            </div>
         
            ) : (
              <div className="-mb-16 mt-14 w-full max-w-md bg-white  p-4 rounded-lg shadow-md z-50 ">
              <p className="text-gray-600 truncate">No results found for "{query}".</p>
            </div>
            )
              
            
        )
      } */}

      

{/* // ////////////////////////////////////// */}
        
        {active && loading &&  (
        <div className="-mb-16 mt-14 w-full max-w-md bg-white p-4 rounded-lg shadow-md z-50">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {active && !loading && results.length > 0 &&  (
        <div className="-mb-16 mt-14 w-full max-w-md bg-white  p-4 rounded-lg shadow-md z-50">
          <h3 className="font-bold text-gray-700 mb-2">Search Results:</h3>
          <ul>
            {results.map((result) => (
              <Link href={`/${result.username}`} onClick={() => {
                setQuery(""); // Clear the search bar
                setResults([]); // Remove search results
              }}  key={result._id}>
              <li
               
                className="py-2 px-1 h-12 hover:bg-slate-100 rounded-md cursor-pointer flex items-center "
               
                >
                   <Image
            src={result.avatarUrl || "/default-avatar.png"} // Fallback to default avatar
            alt={`${result.username}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover "
                    width={36} height={36}
          />
                  
                <span className="text-gray-800 font-medium pl-2">{result.username}</span>
              </li>
                </Link>
            ))}


          </ul>
        </div>
      )}
       
          
          {active && !loading && query && results.length === 0 &&  (
        <div className="-mb-16 mt-14 w-full max-w-md bg-white  p-4 rounded-lg shadow-md z-50 ">
          <p className="text-gray-600 truncate">No results found for "{query}".</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;











