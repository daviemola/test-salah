import React from "react";
const SearchBox = ({
  searchKeyword,
  setSearchKeyword,
  findKeywordData,
  type,
}) => {
  return (
    <div
      style={{ marginBottom: "24px", marginTop: "12px" }}
      // className={type === "showsm" ? "show-sm" : "hide-sm"}
    >
      <div className="input-search-wrapper">
        <svg
          className="input-search-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M17.5 17.4999L13.875 13.8749"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <input
          type="search"
          placeholder="Search for a product"
          className="input-search"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            findKeywordData(e);
          }}
          style={{ color: "#ffffff", backgroundColor: "#02507c" }}
        />
        {searchKeyword ? (
          <a
            className="input-clear-icon"
            style={{ color: "#ffffff" }}
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
    </div>
  );
};

export default SearchBox;
