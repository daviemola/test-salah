import "../styles/globals.css";
import "../styles/spectremin.css";
import CartState from "../context/CartState";

function MyApp({ Component, pageProps }) {
  return (
    <CartState>
      <Component {...pageProps} />
    </CartState>
  );
}

export default MyApp;
