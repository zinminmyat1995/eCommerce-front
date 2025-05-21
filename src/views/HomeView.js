import Banner from "../components/Home/Banner/Banner";
import Products from "../components/Home/Products/Products";
import Deals from "../components/Home/Products/Deals/Deals";
import TopProducts from "../components/Home/Products/TopProducts/TopProducts";
import Benefits from "../components/Home/Benefits/Benefits";
import Search from "../components/Home/Search/Search";


function HomeView() {
  return (
    <main>
 
      <section className="hero-section">
        <Banner />
      </section>


      <section className="benefits-section">
        <Benefits />
      </section>

       <section className="benefits-section">
        <Search />
      </section>

      {/* <section className="products-section">
        <Products />
      </section>


      <section className="deals-section">
        <Deals />
      </section>


      <section className="top-products-section">
        <TopProducts />
      </section> */}
    </main>
  );
}

export default HomeView;
