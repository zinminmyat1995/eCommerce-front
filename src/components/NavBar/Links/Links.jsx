import { Link, useLocation } from "react-router-dom";

const Links = () => {
  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const yOffset = -100; // scroll offset, -10px အပေါ်ကိုလှုပ်
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }

    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    if (mobileExpandedMenu) {
      mobileExpandedMenu.classList.remove("mobile-expanded");
    }
  };


  return (
    <div className="links mb-3 mt-3">
      <Link to="/home"  className="link-btn" style={{width: "unset"}}>Home</Link>
      <button onClick={() => scrollToCategory('category1')} className="link-btn">Cosmetics</button>
      <button onClick={() => scrollToCategory('category2')} className="link-btn">Food</button>
      <button onClick={() => scrollToCategory('category3')} className="link-btn">Medicine</button>
    </div>
  );
};

export default Links;
