import React, { useState } from "react";
import { SocialMediaIcons } from "../../common";
import { AboutUs } from "./aboutus/aboutus";
import { lightOrDark } from "../../../utils/lightOrDark";

const Footer = ({ detail }) => {
  // console.log(detail);
  // console.log(lightOrDark(detail.background_color));
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  // console.log(detail.background_color);

  // console.log(
  //   pickTextColorBasedOnBgColorAdvanced(
  //     detail?.background_color,
  //     "#fff",
  //     "#000"
  //   )
  // );

  return (
    <>
      <footer
        className="main-footer"
        style={{ background: detail.background_color }}
      >
        {/* <div>{detail}</div> */}
        <div className="flex flex-justify--space-between">
          <div className="main-footer__left">
            <a
              className="main-footer__link"
              onClick={toggle}
              style={{
                color:
                  lightOrDark(detail?.background_color) === "light"
                    ? "#57584E"
                    : "#ffffff",
              }}
            >
              About Us
            </a>
          </div>
          <div className="main-footer__right">
            <SocialMediaIcons detail={detail} />
          </div>
        </div>
      </footer>
      <AboutUs openModal={modal} toggle={toggle} detail={detail} />
    </>
  );
};

export default Footer;
