import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import Card from "./components/Card";
import "./App.css";
function App() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);
  console.log("Curr Page is :", page);
  const fetchData = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=100&skip=10`
    );
    const data = await response.data;
    return data;
  };

  const setData = async () => {
    const data = await fetchData();
    console.log(data);
    if (data) {
      setProducts(data.products);
      console.log(products);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const setPageHandler = (currPage) => {
    setPage(currPage);
  };

  if (products.length == 0) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="products">
        {products.slice(page * 10, 9 + page * 10).map((val, idx) => {
          return <Card key={idx} title={val.title} src={val.images[0]} />;
        })}
      </div>
      <div className="bottom-container">
        {page == 0 ? (
          <></>
        ) : (
          <span
            className="pagination__selected"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            ◀️
          </span>
        )}
        {[...Array(products.length / 10)].map((_, i) => {
          return (
            <span
              key={i}
              className="pagination__selected"
              onClick={() => {
                setPageHandler(i);
              }}
            >
              {i}
            </span>
          );
        })}
        {page + 1 == products.length / 10 ? (
          <></>
        ) : (
          <span
            className="pagination__selected"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            ▶️
          </span>
        )}
      </div>
    </>
  );
}

export default App;
