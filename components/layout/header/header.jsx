import React from "react";

import { SocialMediaIcons } from "../../common";
import { useWindowSize } from "../../../hooks/useWindowSize";
// import {useSelector, useDispatch} from "react-redux";
import styles from "./header.module.css";
// import { toggleSidebar } from "../../../store/action/sideBar";
import { lightOrDark } from "../../../utils/lightOrDark";

const Header = ({ detail }) => {
  // const dispatch = useDispatch();
  const { width, height } = useWindowSize();
  let cartItems = [];
  // const cartItems = useSelector(({ sidebar }) => {
  //   return sidebar.cart;
  // });
  const getLeftPartOfNavbar = () => {
    if (typeof width === "undefined" || width > 600) {
      return (
        <div className="bagicon">
          <img
            className={styles.pointer}
            src={
              lightOrDark(detail.background_color) === "light"
                ? "/assets/images/cart.svg"
                : "/assets/images/cart-white.svg"
            }
            alt="cart"
            // onClick={(e) => dispatch(toggleSidebar())}
          />
          {cartItems?.length > 0 ? (
            <span
              className="navbar__cart-total"
              style={{
                color:
                  lightOrDark(detail.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
              }}
            >
              {cartItems.length}
            </span>
          ) : null}
        </div>
      );
    } else {
      return <img src="/assets/images/search.svg" alt="search" />;
    }
  };

  let navCenterStyles = null;
  if (!width || width > 600) {
    if (height > 0) {
      navCenterStyles = styles.navbarFadeout;
    } else {
      navCenterStyles = styles.navbarFadein;
    }
  }
  return (
    <div className="navbar-container z-300">
      <header
        className="navbar navbar-main"
        style={{ backgroundColor: detail?.background_color }}
      >
        <section className="navbar__left"></section>
        <section className="navbar__center">
          <h3
            className="navbar-brand navbar-title"
            style={{
              color:
                lightOrDark(detail.background_color) === "light"
                  ? "#57584E"
                  : "#ffffff",
            }}
          >
            {detail?.name}
          </h3>
          <div className={navCenterStyles}>
            <h4
              style={{
                color:
                  lightOrDark(detail.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
              }}
              className="navbar-brand navbar-merchant-name"
            >
              {`BY ${detail.integration.name}`}
            </h4>
            <span
              style={{
                color:
                  lightOrDark(detail.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
              }}
              className="navbar-brand navbar-welcome-message"
            >
              {detail.welcome_message}
            </span>
          </div>
          <div className="show-sm">
            <div className="social-media flex flex-justify--center">
              <div className="social-media__icon-section"></div>
            </div>
          </div>
        </section>
        <section className="navbar__right hide-sm">
          {getLeftPartOfNavbar()}
        </section>
      </header>
      <div className={styles.icons}>
        <SocialMediaIcons />
      </div>
    </div>
  );
};

export default Header;
