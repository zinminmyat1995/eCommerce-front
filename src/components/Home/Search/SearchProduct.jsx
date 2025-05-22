import Product from "../Products/Product/Product";
import "../Products/Products.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

const SearchProduct = ({ data }) => {
  const { store } = useGlobalContext();

  const syncedProducts = data.map((d) =>
	store.state.products.find((p) => p._id === d._id)
  );

  const columnCount = 3;

  // Fill up empty spots if less than 3 products
  const paddedProducts = [...syncedProducts];
  while (paddedProducts.length > 0 && paddedProducts.length < columnCount) {
	paddedProducts.push(null); // blank cell
  }

  return (
	<div>
	  <h2 className="sub-container mb-3">Search Data</h2>
	  <div
		className="contains-product sub-container"
		id="products"
	  >
		{paddedProducts.length > 0 ? (
		  paddedProducts.map((product, index) =>
			product ? (
			  <Product key={product._id} product={product} />
			) : (
			  <div key={index}></div> // Empty grid cell
			)
		  )
		) : (
		  <div className="skeleton">
			<Skeleton height={250} />
		  </div>
		)}
	  </div>
	</div>
  );
};

export default memo(SearchProduct);
