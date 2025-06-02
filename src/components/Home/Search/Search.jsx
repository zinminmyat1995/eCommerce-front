import { useState } from "react";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import Products from "../../Home/Products/Products";
import SearchProduct from "./SearchProduct";
import NoData from "../../../../public/image/no_data.svg";

const Search = () => {
  const { store } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searched, setSearched] = useState(false);

const handleSearch = () => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
	setSearchData([]);
	store.setSearchResults([]);
	setSearched(false);
	return;
  }

  const results = store.state.products.filter((p) =>
	p.name.toLowerCase().includes(trimmedQuery.toLowerCase())
  );

  setSearchData(results); 
  store.setSearchResults(results);
  setSearched(true);
};

  return (
	<main>
	  <div className="search-container">
		<div className="search-box">
		  <input
			type="text"
			className="search-input"
			placeholder="Search for products..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		  />
		  <button className="search-button" onClick={handleSearch}>
			<FaSearch />
		  </button>
		</div>
	  </div>

	  {searched ? (
		<section className="products-section">
		  {searchData.length > 0 ? (
			<SearchProduct data={searchData} />
		  ) : (
			<div className="no-data-found">
				<img
				src={NoData}
				alt="No results"
				className="no-data-image"
				/>
				<p>No products found matching your search.</p>
			</div>
		  )}
		</section>
	  ) : (
		<section className="products-section">
		  <Products />
		</section>
	  )}
	</main>
  );
};

export default Search;
