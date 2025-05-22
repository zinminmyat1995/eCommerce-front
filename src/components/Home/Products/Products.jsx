import Product from "./Product/Product";
import "./Products.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const { store } = useGlobalContext();

  const groupedProducts = store.state.products.reduce((acc, product) => {
    const key = product.category_id;
    if (!acc[key]) {
      acc[key] = {
        category_name: product.category_name,
        products: [],
      };
    }
    acc[key].products.push(product);
    return acc;
  }, {});

  const sortedGroups = Object.values(groupedProducts).sort((a, b) =>
    a.category_name.localeCompare(b.category_name)
  );

  return (
    <div className="sub-container" id="products">
      

      {store.state.products.length > 0 ? (
        sortedGroups.map((group, idx) => (
          <div key={idx} className="category-group"  id={`category${idx+1}`}>
            <h2 >{group.category_name}</h2>
            <div className="contains-product">
              {group.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="skeleton">
          <Skeleton height={250} />
        </div>
      )}
    </div>
  );
};

export default memo(Products);
