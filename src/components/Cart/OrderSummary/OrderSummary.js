import "./OrderSummary.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const setDelivery = (type) => {
    setDeliveryType(type);
  };
  const checkOut = async () => {
    let payload = {
      DeliveryType: deliveryType,
      DeliveryTypeCost: deliveryType == "Standard" ? 5 : 10,
      costAfterDelieveryRate:
        store.state.cartTotal + (deliveryType == "Standard" ? 5 : 10),
      promoCode: "",
      phoneNumber: phone,
      user_id: auth.state.user?.id,
    };

    const response = await store.confirmOrder(payload);
    if (response.showRegisterLogin) {
      modal.openModal();
    }
  };
  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h6>Total Items ({store.state.cartQuantity})</h6>
            <h6>${store.state.cartTotal}</h6>
          </div>
          <div className="shipping">
            <h6>Shipping</h6>
            <select
              className="select-dropdown"
              onChange={(item) => {
                setDelivery(item.target.value);
              }}
            >
              <option value="Standard" className="select">
                Standard
              </option>
              <option value="Express" className="select">
                Express
              </option>
            </select>
          </div>
          <div className="promo-code">
            <h6>Name</h6>
            <div className="enter-promo">
              <input className="select-dropdown" type="text" />
              {/* <button
                className="flat-button apply-promo"
                disabled={store.state.cartQuantity > 0 ? false : true}
              >
                Apply
              </button> */}
            </div>
          </div>
          <div className="promo-code">
            <h6>Phone Number</h6>
            <input
              className="select-dropdown"
              type="text"
              onChange={(item) => {
                setPhone(item.target.value);
              }}
            />
            <small>
              <em style={{ color: "#ff2100" }}>
                Your number would be called to verify the order placement
              </em>
            </small>
          </div>
          <div className="promo-code">
            <h6>Address</h6>
            <div className="enter-promo">
              <textarea className="select-dropdown" type="text" />
              {/* <button
                className="flat-button apply-promo"
                disabled={store.state.cartQuantity > 0 ? false : true}
              >
                Apply
              </button> */}
            </div>
          </div>
          <div className="final-cost">
            <h6>Total Cost</h6>
            <h4>
              {/* ${" "}
              {store.state.cart.length > 0
                ? store.state.cartTotal + (deliveryType == "Standard" ? 5 : 10)
                : 0} */}
            </h4>
          </div>
          <div className="final-checkout">
            {/* <button
              className="flat-button checkout"
              onClick={() => {
                if (phone.length > 0) {
                  checkOut();
                  toast.info("Your order is being processed");
                  return;
                }
                toast.error("Please enter your phone number");
              }}
              disabled={store.state.cartQuantity > 0 ? false : true}
            >
              Checkout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
