import React from "react";

import Header from "./header/Header";
import Footer from "./footer/footer";

const Layout = ({ children, detail }) => {
  return (
    <div
      className="main-layout"
      style={{
        backgroundColor: detail?.background_color,
        minHeight: "100vh",
        marginBottom: "48px",
      }}
    >
      <div className="wrapper">
        <Header detail={detail} />
        <div className="container">
          <div className="columns">
            <div className="column col-xs-12 col-sm-10 col-md-10 col-lg-8 col-xl-8 col-8 col-mx-auto children">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer detail={detail} />
    </div>
  );
};

export default Layout;
