import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const [qty, setQty] = useState(props.initialQty || 1);
  const [size, setSize] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  useEffect(() => {
    if (size && props.options[size]) {
      const constantPrice = parseInt(props.options[size]);
      setFinalPrice(qty * constantPrice);
    }
  }, [qty, size, props.options]);

  const handleAddtoCart = async () => {
    let existingItem = data.find((item) => item.id === props.labelItem._id);

    if (existingItem) {
      if (existingItem.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.labelItem._id,
          qty: qty,
          price: finalPrice,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          payload: {
            id: props.labelItem._id,
            name: props.labelItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
          },
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      payload: {
        id: props.labelItem._id,
        name: props.labelItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Adjusted the grid-cols classes for different screen sizes */}
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "460px" }}>
        <img className="card-img-top h-[200px] " src={props.labelItem.img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title font-serif text-md">{props.labelItem.name}</h5>
          <div className="container w-100 flex flex-cols-3 gap-2 mr-2">
            <select className="my-2 h-100 bg-green-500 rounded" onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(3), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="my-2 mr-2 h-100 bg-green-500 rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {Object.keys(props.options).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="inline-block text-lg">Rs{finalPrice}/-</div>
          <p className="text-sm text-white mt-2 ">{props.labelItem.description}</p>
          <hr className="bg-slate-500" />
          <button className="rounded bg-green-500 h-10 my-2 w-[120px] font-serif hover:bg-red-400" onClick={handleAddtoCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;


