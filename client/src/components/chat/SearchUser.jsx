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
        className="flex items-center bg-[#F6F6F6] border border-[#E9E9E9] rounded-xl px-3 py-2
               focus-within:border-[#434345]"
      >
        <Search className="text-[#29665B] mr-2" size={18} />

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-black w-full placeholder-gray-400"
        />
      </div>

      {/* Results */}
      {searchQuery && (
        <div className="mt-2 bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg overflow-hidden">
          {searchResult.length > 0 ? (
            searchResult.map((user) => (
              <div
                key={user._id}
                onClick={() => handleSelectUser(user._id)}
                className="px-3 py-2 text-sm font-medium text-[#6A6A6A] cursor-pointer hover:bg-[#F7F7F7]"
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
