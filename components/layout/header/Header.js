import React, { useState, useEffect } from "react";
import CartContext from "@/context/CartContext";
import { useContext } from "react";
import { SocialMediaIcons } from "../../common";
import { useWindowSize } from "../../../hooks/useWindowSize";
import styles from "./header.module.css";
import { lightOrDark } from "../../../utils/lightOrDark";
import { SearchBox } from "@/components/common";
import { ApiServices } from "@/services/apiService";

const Header = ({ detail }) => {
  const { width, height } = useWindowSize();
  const [length, setLength] = useState();
  const { toggleSidebar, cartItems, itemCount } = useContext(CartContext);

  useEffect(() => {
    setLength(cartItems?.length);
  }, [cartItems]);

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
      <div
        style={{
          marginTop: "20px",
        }}
      >
        {/* <SearchBox
          type="showsm"
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
          findKeywordData={findKeywordData}
        /> */}
      </div>

      <header
        className="navbar navbar-main"
        style={{
          backgroundColor: detail?.background_color,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <section className="navbar__left hide-sm"></section>
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
              {`BY ${detail?.integration?.name}`}
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
          {/* {getLeftPartOfNavbar()} */}
          {typeof width === "undefined" || width > 600 ? (
            <>
              <div className="bagicon">
                <img
                  className={styles.pointer}
                  src={
                    lightOrDark(detail.background_color) === "light"
                      ? "/assets/images/cart.svg"
                      : "/assets/images/cart-white.svg"
                  }
                  alt="cart"
                  onClick={toggleSidebar}
                />
                {length > 0 ? (
                  <>
                    <div
                      className="navbar__cart-total"
                      style={{
                        color:
                          lightOrDark(detail.background_color) === "light"
                            ? "#57584E"
                            : "#ffffff",
                      }}
                    >
                      {itemCount}
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <img src="/assets/images/search.svg" alt="search" />
          )}
        </section>
      </header>
      <div className={styles.icons}>
        <SocialMediaIcons detail={detail} />
      </div>
    </div>
  );
};

export default Header;
