import { Routes, Route } from "react-router-dom";
import BookingCarViews from "../../views/Bookingcar/BookingcarViews"

const BookingcarRouter= () => {
  return (
    <Routes>
      <Route path="/" element={<BookingCarViews/>} />
      {/* Có thể thêm các route khác ở đây */}
    </Routes>
  );
};

export default BookingcarRouter;
