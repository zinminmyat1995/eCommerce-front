import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
} from '@coreui/react';
import { FiX } from 'react-icons/fi';
import '@coreui/coreui/dist/css/coreui.min.css';
import { toast } from "react-toastify";

// 🟢 import GlobalContext
import { useGlobalContext } from "../../../GlobalContext/GlobalContext";

const ProductModal = ({ product, onClose, visible }) => {
  const { store } = useGlobalContext(); 

  return (
	<CModal
	  visible={visible}
	  onClose={onClose}
	  size="lg"
	  backdrop="static"
	  alignment="center"
	>
	  <CModalHeader className="no-margin-header">
	  </CModalHeader>

	  <CModalBody className='mb-5'>
		<div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
		  <div style={{ flex: '1 1 40%', textAlign: 'center' }}>
			<img
			  src={product.product_image}
			  alt={product.title}
			  style={{ maxWidth: '100%', borderRadius: '8px' }}
			/>
		  </div>
		  <div style={{ flex: '1 1 50%' }}>
			<h4 style={{ fontWeight: "bold" }}>{product.name}</h4>
			<h3>
			  <span style={{ fontSize: "15px", fontWeight: "bold" }}>$</span><span className="actual-product-price">{product.price}</span>
			</h3>
			<p><strong>Description:</strong> {product.description}</p>
			<p><strong>Availability:</strong> {product.remain > 0 ? `Only ${product.remain} left in stock` : 'Out of stock'}</p>

			<div style={{ marginTop: '1.5rem' }}>
			  <div>
				{product.isInCart == false ? (
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
			  </div>
			</div>
		  </div>
		</div>
	  </CModalBody>
	</CModal>
  );
};

export default ProductModal;
