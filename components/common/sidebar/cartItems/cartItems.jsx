import React from "react";
import styles from "./cartItems.module.css";
import CartContext from "@/context/CartContext";
import { useContext, useState, useEffect } from "react";

const CartItemDisplay = ({ item, index, deleteItem }) => {
  const {
    increase,
    decrease,
    itemCount,
    addToCart,
    qtyZeroErrFunc,
    moreQtyErrFunc,
  } = useContext(CartContext);
  const [quantity, setQuantity] = useState(itemCount);
  const [err, setErr] = useState("");
  const [errQty, setErrQty] = useState("");

  React.useEffect(() => {
    setQuantity(itemCount);
  }, [itemCount]);

  const addToCartItem = () => {
    increase(item);
    qtyZeroErrFunc();
    moreQtyErrFunc();
  };

  useEffect(() => {
    function checkZeroQuantity() {
      if (item?.quantity_cart === 0) {
        qtyZeroErrFunc();
        setErr("You cannot order fewer than 1 item at a time");
      } else if (
        item?.unlimited === false &&
        item.quantity_cart > item?.quantity
      ) {
        moreQtyErrFunc();
        setErrQty(`Only ${item?.quantity} in stock`);
      } else {
        qtyZeroErrFunc();
        moreQtyErrFunc();
        setErr("");
        setErrQty("");
      }
    }
    checkZeroQuantity();
    //eslint-disable-next-line
  }, [itemCount, item]);

  const minusFromCart = () => {
    decrease(item);
    qtyZeroErrFunc();
    moreQtyErrFunc();
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(item);

  return (
    <div className={styles.bagView_product} key={index}>
      <div className={`${styles.flex} ${styles.flex_justify_start}`}>
        <div>
          <img
            src={item?.files[0]?.path}
            className={styles.bagView_product_image}
            alt="img"
          />
        </div>
        <div className={styles.bagView_product_price}>
          <p className={styles.bagView_product_price_text}>{item?.name}</p>
          <p className={styles.bagView_product_price_text}>
            {item.currency} {numberWithCommas(item.price / 100)}
          </p>
        </div>
      </div>
      <div className={`${styles.flex} ${styles.flex_direction_column}`}>
        <div className={styles.bagView_product_quantity}>
          <div className={styles.quantity}>
            <span>
              <button
                className={styles.quantity_minus}
                onClick={() => {
                  minusFromCart();
                }}
              >
                <img
                  src="https://paystack.shop/assets/images/minus.svg"
                  alt="Decrement"
                />
              </button>
            </span>
            <input
              type="tel"
              className={styles.quantity_input}
              value={Number(item?.quantity_cart)}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
                let data = item;
                data.quantity_cart = Number(e.target.value);
                addToCart(data);
              }}
            />
            <span>
              <button
                className={styles.quantity_plus}
                onClick={() => {
                  addToCartItem();
                }}
              >
                <img
                  src="https://paystack.shop/assets/images/plus.svg"
                  alt="Decrement"
                />
              </button>
            </span>
          </div>
          <button
            className={styles.bagview_delete_item}
            onClick={(e) => {
              deleteItem(e, item);
            }}
          ></button>
        </div>
        {/* <span style={{ width: "30%" }}> */}
        {err ? (
          <p style={{ color: "red", fontWeight: "600", textAlign: "right" }}>
            You cannot order <br /> fewer than 1 item <br /> at a time
          </p>
        ) : errQty ? (
          <p style={{ color: "red", fontWeight: "600", textAlign: "right" }}>
            {`Only ${item?.quantity} is in stock`}
          </p>
        ) : null}
        {/* </span> */}
      </div>
    </div>
  );
};

export default CartItemDisplay;
