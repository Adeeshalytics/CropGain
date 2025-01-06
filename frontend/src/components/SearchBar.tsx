import React from 'react';

const SearchBar: React.FC = () => (
  <div className="flex items-center bg-white rounded-full p-2 w-full max-w-md shadow-lg"
   style={{ width: '700px' }}>
    <input
      type="text"
      placeholder="Search crop here"
      className="bg-transparent outline-none px-4 w-full"
    />
  </div>
);

export default SearchBar;
