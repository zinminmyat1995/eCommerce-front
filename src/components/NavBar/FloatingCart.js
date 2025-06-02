import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { Link } from "react-router-dom";

const FloatingCart = () => {
  const { store } = useGlobalContext();
  const cartTotal = store.state.cartQuantity;

  return (
	<Link to="/cart" className="floating-cart">
	  <FaShoppingCart size={24} />
	  <span className="cart-badge">{cartTotal}</span>
	</Link>
  );
};

export default FloatingCart;