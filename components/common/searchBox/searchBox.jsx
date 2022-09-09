import React from "react";
import { lightOrDark } from "../../../utils/lightOrDark";
import { FiSearch } from "react-icons/fi";
import { adjust } from "../../../utils/coloradjust";

const SearchBox = ({
  searchKeyword,
  setSearchKeyword,
  findKeywordData,
  detail,
}) => {
  const inputFieldStyle = `
           .inputField::-webkit-input-placeholder{
                   color: ${
                     lightOrDark(detail?.background_color) === "light"
                       ? "#57584E"
                       : "#ffffff"
                   };
           }`;
  // console.log(showing);
  return (
    <div style={{ marginBottom: "24px", marginTop: "12px" }}>
      <div className="input-search-wrapper">
        <FiSearch
          style={{
            color:
              lightOrDark(detail?.background_color) === "light"
                ? "#57584E"
                : "#ffffff",
            fontSize: "24px",
            position: "absolute",
            left: "24px",
            zIndex: "10",
          }}
          className="input-search-icon"
        />

        <input
          type="search"
          placeholder="Search for a product"
          className="input-search inputField"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            findKeywordData(e);
          }}
          style={{
            color:
              lightOrDark(detail?.background_color) === "light"
                ? "#000000"
                : "#ffffff",
            backgroundColor: adjust(detail?.background_color, -30),
          }}
        />
        {searchKeyword ? (
          <a
            className="input-clear-icon"
            style={{ color: "#fff" }}
            onClick={() => setSearchKeyword("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
        ) : null}
      </div>
      <style>{inputFieldStyle}</style>
    </div>
  );
};

export default SearchBox;
