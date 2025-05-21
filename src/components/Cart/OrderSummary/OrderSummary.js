import "./OrderSummary.css";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  const setDelivery = (type) => {
  setDeliveryType(type);
  };
  const LocationMarker = ({ setLocation, setAddress }) => {
  useMapEvents({
  click(e) {
    const { lat, lng } = e.latlng;
    setLocation({ lat, lng });

    // Call reverse geocoding from OpenStreetMap (Nominatim)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
    .then((res) => res.json())
    .then((data) => {
    setAddress(data.display_name || "Address not found");
    })
    .catch((err) => {
    console.error("Error fetching address:", err);
    setAddress("Failed to get address");
    });
  },
  });
  return null;
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
          <MapContainer center={[11.5564, 104.9282]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setLocation={setLocation} setAddress={setAddress} />
            {location && <Marker position={location} />}
          </MapContainer>

         


          <textarea className="select-dropdown" type="text" rows={4} value={address} onChange={(e)=>setAddress(e.target.value)}/>
        

        </div>
      </div>

   


      <div className="final-cost">
      <h6>Total Cost</h6>
      <h6>
        ${" "}
        {store.state.cart.length > 0
        ? store.state.cartTotal + (deliveryType == "Standard" ? 5 : 10)
        : 0}
      </h6>
      </div>
      <div className="final-checkout">
      <button
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
      </button>
      </div>
    </div>
    </div>
  </div>
  );
};
export default OrderSummary;
