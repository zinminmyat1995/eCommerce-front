import Product from "../Products/Product/Product"

import "../Products/Products.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";


const SearchProduct = (data) => {
  let sortedProducts = data.data;

  const { store } = useGlobalContext();

  const syncedProducts = data.data.map((d) =>
	store.state.products.find((p) => p._id === d._id)
  );


  const columnCount = Math.min(sortedProducts.length, 3);

  return (
	<div >
		  <h2 	className="sub-container mb-3" >Search Data</h2>
		  <div
			className="sub-container"
			id="products"
			style={{
				display: "flex",
				gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
				gap: "1rem",
			}}
		>

		  {syncedProducts.length > 0 ? (
			<div className="contains-product">
			  {syncedProducts.map((product) => (
				<Product key={product._id} product={product} />
			  ))}
			</div>
		  ) : (
			<div className="skeleton">
			  <Skeleton height={250}></Skeleton>
			</div>
		  )}
		</div>
	</div>
	
  );
};
export default memo(SearchProduct);
