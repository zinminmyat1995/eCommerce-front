import { FaShoppingCart,FaUser,FaTruck   } from "react-icons/fa";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { Link } from "react-router-dom";
import "./Account.css";


const Account = () => {
  // let { store } = useGlobalContext();
  let { auth, store, modal } = useGlobalContext();
  const cartTotal = store.state.cartQuantity;

  const handleShowModal = () => {
    modal.openModal(false);
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="account">
      <div className="cart contains-link-to-accounts">
       
          <span className="account-user">
            <Link to="/delivery">
              <FaTruck style={{ marginRight: "5px", fontSize: "22px", color: "red" }} />
            </Link>
          </span>
          <Link to={"/cart"} className="contains-link-to-accounts">
            {auth.state.user == null ? (
              <span className="account-user">
                <FaUser style={{ marginRight: "5px" }} />
                Guest
              </span>
            ) : (
              <span className="account-user">
                <FaUser style={{ marginRight: "5px" }} />
                {auth.state.user.username}
              </span>
            )}
          </Link>
      </div>
      <div className="login">
        {auth.state.user == null ? (
          <button
            className="btn-rounded small-rounded"
            onClick={handleShowModal}
          >
            Login
          </button>
        ) : (
          <button className="btn-rounded small-rounded" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
export default Account;
