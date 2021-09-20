function SearchBar({ value }) {
    return (
        <input id="search-bar" type="search" placeholder="Search for a song" value={value}></input>
    );
}

export default SearchBar;
