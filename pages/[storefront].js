import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchBox } from "@/components/common";
import { ProductCard } from "@/components/ProductCard/index";
import { Layout } from "@/components/layout/index";
import { Sidebar } from "@/components/common/sidebar/index";
import { ApiServices } from "@/services/apiService";
import Drawer from "@mui/material/Drawer";
import { FloatingCartIconMobile } from "@/components/common/FloatingCartIconMobile/index";
import { NoSearchFound } from "@/components/common/nosearchfound/index";
import { LoadingView } from "@/components/common/loadingView/index";
import CartContext from "@/context/CartContext";
import { useContext } from "react";

export const getStaticPaths = () => {
  const paths = [
    {
      params: { storefront: "shutabug" },
    },
    {
      params: { storefront: "test-salah" },
    },
  ];
  return {
    paths,
    fallback: false,
  };
};

const StoreFront = ({ products, detail }) => {
  console.log(detail);
  const router = useRouter();
  const { storefront, product } = router.query;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [checkItem, setcheckItem] = useState(true);
  const [showProducts, setShowProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [loadingsearch, setLoadingsearch] = useState(true);
  const { toggleSidebar, sidetoggle, cartItems, total } =
    useContext(CartContext);

  const toggleDrawer = () => {
    toggleSidebar();
  };

  console.log(sidetoggle);

  const findKeywordData = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const apiServices = new ApiServices();
      const data = await apiServices.searchProducts(searchKeyword, storefront);
      if (data.length > 0) {
        setLoading(false);
        setShowProducts(data);
        setcheckItem(false);
      } else {
        setLoading(false);
        setShowProducts(data);
        setcheckItem(false);
      }
    }
    console.log(searchKeyword);
    if (searchKeyword === "") {
      console.log("nothing on searchkeyword");
      setShowProducts(products);
      setcheckItem(false);
    }
  };

  useEffect(() => {
    // setLoadingsearch(true);
    const callSearchApi = setTimeout(async () => {
      console.log("here");
      setLoading(true);

      if (searchKeyword !== "") {
        console.log("not search keyword");
        const apiServices = new ApiServices();
        const data = await apiServices.searchProducts(
          searchKeyword,
          storefront
        );
        if (data.length > 0) {
          setLoading(false);
          setShowProducts(data);
          setcheckItem(false);
        } else {
          setLoading(false);
          setShowProducts(data);
          setcheckItem(false);
        }
      } else {
        setShowProducts(products);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(callSearchApi);
    //eslint-disable-next-line
  }, [searchKeyword]);

  console.log(loadingsearch);

  return (
    <>
      <Layout detail={detail}>
        <div>
          <SearchBox
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            findKeywordData={findKeywordData}
          />
          {showProducts && showProducts.length > 0 && loading == false ? (
            <div className="container page-height">
              <div className="columns">
                {showProducts.map((item, index) => {
                  return (
                    <ProductCard
                      item={item}
                      key={index}
                      productQuery={product}
                      detail={detail}
                    />
                  );
                })}
              </div>
            </div>
          ) : loading ? (
            <LoadingView />
          ) : (
            <NoSearchFound searchKeyword={searchKeyword} />
          )}
          <Drawer anchor={"right"} open={sidetoggle} onClose={toggleDrawer}>
            <Sidebar cartItems={cartItems} detail={detail} total={total} />
          </Drawer>
          <FloatingCartIconMobile onClose={toggleDrawer} />
        </div>
      </Layout>
    </>
  );
};

export default StoreFront;

export const getStaticProps = async (context) => {
  const storefront = context.params.storefront;
  const apiServices = new ApiServices();
  const products = await apiServices.getAllProducts(storefront);
  const detail = await apiServices.getStoreFrontDetail(storefront);
  return {
    props: {
      products,
      detail,
    },
  };
};
