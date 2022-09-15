import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import CartItemDisplay from "./cartItems/cartItems";
import EmptyCart from "./emptyCart/emptyCart";
import Checkout from "./checkout/checkout";
import OrderDeail from "./reviewOrder/reviewOrder";
import axios from "axios";
import { adjust, numberWithCommas } from "../../../utils/coloradjust";
import { lightOrDark } from "../../../utils/lightOrDark";

const SideBar = ({ cartItems, total, detail, item }) => {
  const {
    toggleSidebar,
    deleteDataFromCart,
    qtyZeroErr,
    itemCount,
    moreQtyErr,
    cartItems: cartitems,
  } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderDeatil, setShowOrderDeatil] = useState(false);

  const [isThisIsGift, setIsThisIsGift] = useState(false);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmailAddress, setRecipientEmailAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryCountry, setDeliveryCountry] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [shippingRegion, setShippingRegion] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");

  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [recipientFirstNameError, setRecipientFirstNameError] = useState(false);
  const [recipientPhoneError, setRecipientPhoneError] = useState(false);
  const [recipientEmailAddressError, setRecipientEmailAddressError] =
    useState(false);
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);
  const [deliveryCityError, setDeliveryCityError] = useState(false);
  const [shippingRegionError, setShippingRegionError] = useState(false);

  const [customerFirstNameError, setCustomerFirstNameError] = useState(false);
  const [customerLastNameError, setCustomerLastNameError] = useState(false);
  const [customerEmailError, setCustomerEmailError] = useState(false);
  const [customerPhoneError, setCustomerPhoneError] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const manageCartItems = async () => {
    let updateCart = [];
    // await Promise?.all(
    cartItems?.map((data) => {
      let item = data?.variant_options[0]?.id;
      let quantity = data.quantity;
      let type = "variant";
      let setObject = { item, quantity, type };
      updateCart.push(setObject);
    });
    // );
    setUpdatedCartItems(updateCart);
  };
  let items = item;
  const deleteItem = (e, item) => {
    e.preventDefault();
    // console.log(cartitems);
    // console.log(item);
    let itemSelected = cartitems.filter((it) => {
      if (it.id === item.id) {
        console.log("item found yeas");
        return it;
        // item.quantity_cart = 0;
      }
    });
    // console.log(item.quantity_cart);
    console.log(itemSelected);

    deleteDataFromCart(itemSelected[0]);
  };

  const closeCheckOut = () => {
    setShowCheckout(!showCheckout);
  };
  const showOrderDetail = () => {
    setShowCheckout(false);
    setCustomerFirstNameError(false);
    setCustomerLastNameError(false);
    setCustomerEmailError(false);
    setCustomerPhoneError(false);
    setShowOrderDeatil(!showOrderDeatil);
  };
  const openCheckout = () => {
    setShowOrderDeatil(!showOrderDeatil);
    setShowCheckout(!showCheckout);
  };
  const changeView = () => {
    setRecipientFirstNameError(false);
    setRecipientPhoneError(false);
    setRecipientEmailAddressError(false);
    setDeliveryAddressError(false);
    setDeliveryCityError(false);
    setShippingRegionError(false);
    setShowPaymentSection(!showPaymentSection);
  };
  const checkoutDetails = (e) => {
    e.preventDefault();
    if (deliveryAddress == "" && deliveryCity == "" && shippingRegion == "") {
      if (
        isThisIsGift &&
        recipientFirstName == "" &&
        recipientPhone == "" &&
        recipientEmailAddress == ""
      ) {
        setRecipientFirstNameError(!recipientFirstNameError);
        setRecipientPhoneError(!recipientPhoneError);
        setRecipientEmailAddressError(!recipientEmailAddressError);
      }
      setDeliveryAddressError(!deliveryAddressError);
      setDeliveryCityError(!deliveryCityError);
      setShippingRegionError(!shippingRegionError);
      return;
    }
    if (isThisIsGift && recipientFirstName == "") {
      setRecipientFirstNameError(!recipientFirstNameError);
      return;
    }
    if (isThisIsGift && recipientPhone == "") {
      setRecipientPhoneError(!recipientPhoneError);
      return;
    }
    if (recipientEmailAddress == "") {
      setRecipientEmailAddressError(!recipientEmailAddressError);
    }
    if (deliveryAddress == "") {
      setDeliveryAddressError(!deliveryAddressError);
      return;
    }
    if (deliveryCity == "") {
      setDeliveryCityError(!deliveryCityError);
      return;
    }
    if (shippingRegion == "") {
      setShippingRegionError(!shippingRegionError);
      return;
    }
    changeView();
  };
  const paymentDetails = (e) => {
    e.preventDefault();
    if (
      customerFirstName == "" &&
      customerLastName == "" &&
      customerEmail == "" &&
      customerPhone == ""
    ) {
      setCustomerFirstNameError(!customerFirstNameError);
      setCustomerLastNameError(!customerLastNameError);
      setCustomerEmailError(!customerEmailError);
      setCustomerPhoneError(!customerPhoneError);
      return;
    }
    if (customerFirstName == "") {
      setCustomerFirstNameError(!customerFirstNameError);
      return;
    }
    if (customerLastName == "") {
      setCustomerLastNameError(!customerLastNameError);
      return;
    }
    if (customerEmail == "") {
      setCustomerEmailError(!customerEmailError);
      return;
    }
    if (customerPhone == "") {
      setCustomerPhoneError(!customerPhoneError);
      return;
    }
    showOrderDetail();
  };
  const orderPlace = async (e) => {
    e.preventDefault();
    let setShippingFee = parseFloat(shippingPrice.slice(4).replace(/,/g, ""));
    let data = {
      storefront: 2576,
      currency: "ILS",
      email: customerEmail,
      phone: customerPhone,
      first_name: customerFirstName,
      last_name: customerLastName,
      items: updatedCartItems,
      is_gift: isThisIsGift,
      pay_for_me: false,
      shipping: {
        street_line: "test",
        city: deliveryCity,
        country: deliveryCountry,
        shipping_fee: setShippingFee,
        state: deliveryState,
        delivery_note: deliveryNote,
      },
      receiver: {
        first_name: recipientFirstName,
        phone: recipientPhone,
        last_name: recipientLastName,
        email: recipientEmailAddress,
      },
      notify_receiver_email: true,
    };
    try {
      let response = await axios.post("https://api.paystack.co/order", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer pk_live_a5e1525d733a4254c387d163c6392c338108a6b4",
        },
      });
      console.log("data we get in return,", response.data);
      if (response.status == 200 || response.status == 201) {
        dispatch(deleteCart());
      }
    } catch (error) {
      console.log("error is", error);
    }
  };
  useEffect(() => {
    manageCartItems();
    //eslint-disable-next-line
  }, [cartItems]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <div className={styles.off_canvas_sidebar}>
        {showCheckout ? (
          <Checkout
            detail={detail}
            close={closeCheckOut}
            show_order_detail={paymentDetails}
            isThisIsGift={isThisIsGift}
            setIsThisIsGift={setIsThisIsGift}
            recipientFirstName={recipientFirstName}
            setRecipientFirstName={setRecipientFirstName}
            recipientLastName={recipientLastName}
            setRecipientLastName={setRecipientLastName}
            recipientPhone={recipientPhone}
            setRecipientPhone={setRecipientPhone}
            recipientEmailAddress={recipientEmailAddress}
            setRecipientEmailAddress={setRecipientEmailAddress}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            deliveryCity={deliveryCity}
            setDeliveryCity={setDeliveryCity}
            deliveryState={deliveryState}
            setDeliveryState={setDeliveryState}
            deliveryCountry={deliveryCountry}
            setDeliveryCountry={setDeliveryCountry}
            deliveryNote={deliveryNote}
            setDeliveryNote={setDeliveryNote}
            shippingRegion={shippingRegion}
            setShippingRegion={setShippingRegion}
            customerFirstName={customerFirstName}
            setCustomerFirstName={setCustomerFirstName}
            customerLastName={customerLastName}
            setCustomerLastName={setCustomerLastName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            setShippingPrice={setShippingPrice}
            showPaymentSection={showPaymentSection}
            setShowPaymentSection={setShowPaymentSection}
            showEmailSection={showEmailSection}
            setShowEmailSection={setShowEmailSection}
            cartItems={cartItems}
            allTotal={total}
            shippingPrice={shippingPrice}
            recipientFirstNameError={recipientFirstNameError}
            recipientPhoneError={recipientPhoneError}
            recipientEmailAddressError={recipientEmailAddressError}
            deliveryAddressError={deliveryAddressError}
            deliveryCityError={deliveryCityError}
            shippingRegionError={shippingRegionError}
            customerFirstNameError={customerFirstNameError}
            customerLastNameError={customerLastNameError}
            customerEmailError={customerEmailError}
            customerPhoneError={customerPhoneError}
            changeView={changeView}
            checkoutDetails={checkoutDetails}
          />
        ) : showOrderDeatil && showCheckout == false ? (
          <OrderDeail
            checkout={openCheckout}
            customerFirstName={customerFirstName}
            customerLastName={customerLastName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            deliveryAddress={deliveryAddress}
            deliveryNote={deliveryNote}
            shippingRegion={shippingRegion}
            shippingPrice={shippingPrice}
            cart={cartItems}
            allTotal={total}
            detail={detail}
            orderPlace={orderPlace}
            isThisIsGift={isThisIsGift}
            deliveryCity={deliveryCity}
            deliveryCountry={deliveryCountry}
            recipientFirstName={recipientFirstName}
            recipientLastName={recipientLastName}
            recipientPhone={recipientPhone}
            recipientEmailAddress={recipientEmailAddress}
          />
        ) : (
          <div className={styles.bagView}>
            <div>
              <div className={styles.bagSummary}>
                <div className={styles.bagSummaryHeader}>
                  <div className={styles.bagSummaryHeaderLeft}>
                    <div className={styles.bagIcon}>
                      <svg
                        className="bagicon__icon"
                        width="22"
                        height="25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.421 6.284h7.904v2.384c0 1.04-.416 2.038-1.157 2.774a3.969 3.969 0 01-5.59 0 3.908 3.908 0 01-1.157-2.774V6.284z"
                          fill={
                            lightOrDark(detail?.background_color) === "light"
                              ? "#3BB75E"
                              : adjust(detail?.background_color, -30)
                          }
                        ></path>
                        <path
                          d="M11.373 0A3.969 3.969 0 008.58 1.15 3.908 3.908 0 007.42 3.923v2.53h1.635v-2.53a2.293 2.293 0 01.695-1.599 2.328 2.328 0 013.248 0c.434.423.683.997.695 1.6v2.53h1.635v-2.53a3.901 3.901 0 00-1.159-2.776A3.958 3.958 0 0011.373 0z"
                          fill={
                            lightOrDark(detail?.background_color) === "light"
                              ? "#3BB75E"
                              : adjust(detail?.background_color, -30)
                          }
                        ></path>
                        <path
                          d="M21.996 23.67L20.102 7.343a1.19 1.19 0 00-.395-.754 1.208 1.208 0 00-.8-.303H13.71v2.317a2.31 2.31 0 01-.684 1.64 2.346 2.346 0 01-3.306 0 2.31 2.31 0 01-.684-1.64V6.285H3.844c-.296 0-.58.108-.801.303a1.19 1.19 0 00-.394.754L.758 23.671a1.185 1.185 0 00.297.93 1.201 1.201 0 00.898.399h18.844a1.21 1.21 0 00.9-.397 1.19 1.19 0 00.299-.932z"
                          fill={
                            lightOrDark(detail?.background_color) === "light"
                              ? "#3BB75E"
                              : adjust(detail?.background_color, -30)
                          }
                        ></path>
                      </svg>
                      <span
                        style={{
                          color:
                            lightOrDark(detail?.background_color) === "light"
                              ? "#3BB75E"
                              : adjust(detail?.background_color, -30),
                          fontSize: "16px",
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {itemCount}
                      </span>
                    </div>
                  </div>
                  <div className={styles.bagSummaryHeaderRight}>
                    <p className={styles.bagSummaryPriceText}>
                      {detail.shipping_fees[0].currency}{" "}
                      {total ? numberWithCommas(total / 100) : 0}
                    </p>
                  </div>
                </div>
                <div className={styles.bagSummaryHeader}>
                  <div className={styles.bagSummaryHeaderLeft}></div>
                  <div className={styles.bagSummaryHeaderRight}>
                    <p
                      className={styles.bagSummaryPriceText}
                      style={{ color: "gray" }}
                    >
                      {cartItems.length === 0
                        ? `Shipping:  ${detail?.shipping_fees[0]?.currency} 0`
                        : `Shipping: ${detail?.shipping_fees[0]?.currency} ${
                            detail?.shipping_fees[0].fee
                              ? numberWithCommas(
                                  detail?.shipping_fees[0].fee / 100
                                )
                              : 0
                          }`}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.bagViewContent}>
                {cartItems && cartitems.length > 0 ? (
                  cartItems.map((item, index) => {
                    // console.log(item);
                    return (
                      <CartItemDisplay
                        key={index}
                        item={item}
                        index={index}
                        deleteItem={deleteItem}
                      />
                    );
                  })
                ) : (
                  <EmptyCart />
                )}
              </div>
            </div>
            <div className={styles.bagViewFooter}>
              <div className={styles.bagView_Actions}>
                {cartItems && cartItems.length > 0 && (
                  <button
                    className={`${styles.btn_primary} ${styles.btn_checkout}`}
                    onClick={() => {
                      setShowCheckout(!showCheckout);
                    }}
                    disabled={moreQtyErr || qtyZeroErr}
                    style={{
                      backgroundColor:
                        lightOrDark(detail?.background_color) === "light"
                          ? "#3BB75E"
                          : adjust(detail?.background_color, -30),
                      opacity: moreQtyErr || qtyZeroErr ? 0.5 : 1,
                    }}
                  >
                    Checkout
                  </button>
                )}
                <button
                  className={styles.btn_primary}
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  Keep Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
