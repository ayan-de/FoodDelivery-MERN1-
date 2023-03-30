import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  let dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id:foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img:props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
        // console.log(data);
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name:foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success"
              onClick={handleClick}
              onChange={handleQty}
              // onChange={(e) => setSize(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {" "}
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="rounded m-2 h-100 bg-success text-black rounded"
              style={{ select: "#FF0000" }}
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
              // onChange={(e) => setQty(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">Rs{finalPrice}/-</div>
          </div>
        
        <hr></hr>
        <button
          className={`btn btn-success justify-center ms-2`}
          onClick={handleAddToCart}
        >
          Add To Card
        </button>
      </div>
    </div>
    </div>
  );
}
