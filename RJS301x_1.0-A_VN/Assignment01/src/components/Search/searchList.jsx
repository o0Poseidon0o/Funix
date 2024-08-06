import React from "react";
import searchs from "../../data/search.json";
import SearchItem from "./searchItem";

const SearchList = () => {
  // Lấy dư liệu từ file json
  return (
    <div className="col-md-9">
      {searchs.map((item) => (
        <SearchItem key={item.name} item={item}></SearchItem>
      ))}
    </div>
  );
};

export default SearchList;
