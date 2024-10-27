import React, { useRef, useEffect } from 'react';

function SearchBar({ focus }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className='search'>
      <input ref={inputRef} type="text" placeholder='Search' />
    </div>
  );
}

export default SearchBar;
