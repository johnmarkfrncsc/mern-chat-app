import { Search } from "lucide-react";

const SearchUser = ({
  searchQuery,
  setSearchQuery,
  searchResult,
  handleSelectUser,
  containerRef,
}) => {
  return (
    <div ref={containerRef} className="w-full max-w-xl mt-10 px-3">
      {/* Search Bar */}
      <div
        className="flex items-center bg-[#1A213D] border border-[#2b2d31] rounded-xl px-3 py-2
               focus-within:border-blue-600"
      >
        <Search className="text-gray-400 mr-2" size={18} />

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-200 w-full placeholder-gray-400"
        />
      </div>

      {/* Results */}
      {searchQuery && (
        <div className="mt-2 bg-[#1A213D] border border-[#2b2d31] rounded-lg overflow-hidden">
          {searchResult.length > 0 ? (
            searchResult.map((user) => (
              <div
                key={user._id}
                onClick={() => handleSelectUser(user._id)}
                className="px-3 py-2 text-sm text-gray-200 cursor-pointer hover:bg-[#2b2d31]"
              >
                {user.username}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">No user found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
