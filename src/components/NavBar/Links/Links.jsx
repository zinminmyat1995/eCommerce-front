import { Link, useLocation } from "react-router-dom";
const Links = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToProducts = () => {
    if (!isHomePage) return;
    const products = document.getElementById("products");
    products.scrollIntoView({ behavior: "smooth" });
    removeExpandedClass();
  };

  const removeExpandedClass = () => {
    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    mobileExpandedMenu.classList.remove("mobile-expanded");
  };

  return (
    <div className="links mb-3 mt-3">
      <Link to={"/"} onClick={removeExpandedClass}>
        Deals
      </Link>
      <Link to={"/#products"} onClick={scrollToProducts}>
        What's New
      </Link>
      <Link to={"/delivery"} onClick={removeExpandedClass}>
        Delivery
      </Link>
    </div>
  );
};

export default Links;
