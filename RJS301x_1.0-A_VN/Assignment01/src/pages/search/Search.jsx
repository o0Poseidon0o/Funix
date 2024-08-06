import SearchList from "../../components/Search/searchList";
import SearchPopop from "../../components/Search/searchPopop";
import NavBarmain from "../../components/navBar/NavBarMain";
import Footer from "../../components/Footer/Footer";

const Search = () => {
  return (
    <div>
      <NavBarmain></NavBarmain>
      <div className="container">
        <div className="row">
          <SearchPopop></SearchPopop>
          <SearchList></SearchList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Search;
