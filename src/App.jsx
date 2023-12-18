import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delByIdProducts,
  fetchProducts,
  postProducts,
} from "./redux/productSlice";

function App() {
  const [inp, setInp] = useState("");
  const { value, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  function handlePost() {
    dispatch(postProducts({ name: inp }));
  }

  return (
    <>
      <input type="text" onChange={(e) => setInp(e.target.value)} value={inp} />
      <button onClick={handlePost}>Add</button>
      <ul>
        {isLoading ? (
          <h2>Loading ...</h2>
        ) : error ? (
          <h2>Errror {error.message}</h2>
        ) : (
          value.map((x) => (
            <li key={x.id} onClick={() => dispatch(delByIdProducts(x.id))}>
              {x.name}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
