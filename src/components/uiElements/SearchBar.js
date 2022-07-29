import "./SearchBar.css";
const SearchBar = (props) => {
  return (
    <div className="search_section">
      <input placeholder="search" onChange={props.change} type="search"></input>
    </div>
  );
};
export default SearchBar;
