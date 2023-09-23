import Cart from "./component/Cart/Cart";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import { useState } from "react";
import CartProvider from "./store/CartProvider";


function App() {

  const [cartIsShow, setCartIsShow] = useState(false)

  function showCartHandler() {
    setCartIsShow(true)
  }

  function hideCartHandler() {
    setCartIsShow(false)
  }

  return (
    <CartProvider>
      {cartIsShow && <Cart onClose={ hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
