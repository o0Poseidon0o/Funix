import React from "react";
import "./SearchItem.css";

// Cấu trúc hiển thị mỗi hotel
const SearchItem = (props) => {
  const item = props.item;
  return (
    <div className="search-item">
      <img src={item.image_url} alt=""></img>
      {/* Phần description */}
      <div className="search-item__des">
        <h3>{item.name}</h3>
        <p>{`${item.distance} from center`}</p>
        <span>{item.tag}</span>
        <p>
          <strong>{item.description}</strong>
        </p>
        <p>{item.type}</p>
        {/* Kiểm tra có miễn phí hủy book không */}
        {item.free_cancel ? (
          <div className="cancel">
            <p>
              <strong>Free cancellation</strong>
            </p>
            <p>You can cancel later, so lock in this great proce today!</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Phần rate */}
      <div className="search-item__rate">
        <div className="rate">
          <span>
            <strong>{item.rate_text}</strong>
          </span>
          <span>{item.rate}</span>
        </div>
        <div>
          <p>
            <strong>${item.price}</strong>
          </p>
          <p>Includes taxes and fees</p>
          <button>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
