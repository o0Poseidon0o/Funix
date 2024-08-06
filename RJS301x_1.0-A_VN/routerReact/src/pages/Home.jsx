import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  function navgateHandler() {
    navigate("/products");
  }
  return (
    <>
      <h1>My home Page</h1>
      <p>
        Go to <Link to="products">The list of products</Link>
      </p>
      <p>
        <button onClick={navgateHandler}>Navigate</button>
      </p>
    </>
  );
}
export default HomePage;
// Dùng Link để tăng hiệu suất chuyển trang
