import "./Product.css";
import { useState } from "react";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi"; 
import { useGlobalContext } from "../../../GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import ProductModal from './ProductModal';

const Product = ({ product }) => {
  let {store} = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  let stars = [];
  for (let i = 0; i < product?.rating; i++) {
    stars.push(<FaStar key={i} />);
  }
  const isInCart = product?.addedToCart;

  return (
    <div className="product-container">
      <div className="image">
        <img
          src={product?.product_image}
          alt="Product Image"
          width={"100%"}
        />
      </div>
      <div className="product-details">
        <div className="name-add-to-cart"></div>
        <div className="price">
          <div className="name-price-product">
            <h4>{product?.name}</h4>
            <h5>
              <span>$</span><span className="actual-product-price">{product?.price}.00</span>
            </h5>
          </div>
          {/* <h5 style={{color: "gray" , fontSize: "1rem"}} className="product-description">{product?.description}</h5> */}
          <div className="star-rating">
            {/* <div className="star">{stars}</div> */}
            <span>{product?.remain} Left</span>
          </div>
        </div>
        <div>
          {isInCart == false ? (
            <button
              className="add-to-cart"
              onClick={() => {
                if (store.state.cartQuantity > 10) {
                  toast.warning("You can only add 10 items to cart");
                  return;
                }
                store.addToCart(product?._id);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => {
                store.removeFromCart(product?._id);
              }}
            >
              Remove from cart
            </button>
          )}
          <button
            className="external-button"
            title="View Details"
             onClick={() => {
              setSelectedProduct(product);
              setShowModal(true);
            }}
          >
            <FiExternalLink size={18} />
          </button>
        </div>
      </div>

      {showModal && selectedProduct && (
        <ProductModal
          visible={showModal}
          product={{
            ...selectedProduct,
            isInCart: selectedProduct?.addedToCart,
          }}
          store={store}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null); // Clear after close
          }}
        />
      )}

    </div>
  );
};
export default Product;
