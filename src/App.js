import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux'
import HomeView from "./views/HomeView";
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import NavBar from "./components/NavBar/NavBar";
import ShopFooter from "./components/Footer/ShopFooter";
import { useGlobalContext } from "./components/GlobalContext/GlobalContext";
import Modal from "./components/Modals/Modal";
import { ToastContainer, toast } from "react-toastify";
import FloatingCart from "./components/NavBar/FloatingCart"
import DeliveryView from "./views/DeliveryView";
import CancelOrder from "./components/Modals/CancelOrder";

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const CartView = React.lazy(() => import('./views/CartView'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  let { modal } = useGlobalContext();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    setColorMode(storedTheme)
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let { store } = useGlobalContext();
  useEffect(() => {
    if (store.state.products.length > 0) return;
    store.getProducts();
  }, []);


  return (
    <>
      <BrowserRouter>
          <React.Suspense>
          <header>
            <NavBar></NavBar>
          </header>
          <Routes>
              <Route exact path="/home" name="home" element={<HomeView />} />
              <Route exact path="/cart" element={<CartView />} />
              <Route path="/delivery" element={<DeliveryView />} />
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>
            <FloatingCart />
            <footer>
             <ShopFooter></ShopFooter>
          </footer>
        </React.Suspense>
      </BrowserRouter>
       {modal.opened && (
        <Modal
          header={modal.isRegister ? "Create Account" : "Login"}
          submitAction="/"
          buttonText={modal.isRegister ? "Create Account" : "Login"}
          isRegister={modal.isRegister}
        />
      )}
      {modal.isCancelModal && <CancelOrder></CancelOrder>}
      <ToastContainer />
    </>
  )
}

export default App
