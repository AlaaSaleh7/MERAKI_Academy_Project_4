import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";
import { CgInsertAfterO } from "react-icons/cg";
import profileFemale from "./../../src/profile-female.png";
import profileMen from "./../../src/profile-men.png";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const [result, setResult] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const history = useHistory();

  const [Date, setDate] = useState("");

  let thisToken = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/id/`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setResult(result.data);
        localStorage.setItem("userInfo", JSON.stringify(result));
      })
      .catch((err) => {
        // console.log(err);
      });

    axios
      .get(`http://localhost:5000/order`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setMyOrder(result.data);
      })
      .catch((err) => {});
  }, []);

  const a = myOrder.map((element, i) => {
    console.log("order", element);

    return (
      <div className="user-info">
        <p># {i + 1} Order</p>
        <p>
          {" "}
          <span> date: </span>
          {element.date}{" "}
        </p>

        <p>
          {" "}
          <span> Total Price: </span>
          {element.totalPrice}{" "}
        </p>

        <p class="product-info">
          {" "}
          <span> Order Info: </span>
        </p>
        {element.products.map((ele, i) => {
          return (
            <div class="info-order">
              <div class="img-order">
                <p>#{i + 1}</p>
                <img src={ele.product.img} height={50} width={50} />
              </div>

              <div class="product-information">
                <p>Name Product: {ele.product.name}</p>
                <p>price: {ele.product.price} </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="profile">
      <div>
        <img
          src={result.gender == "male" ? profileMen : profileFemale}
          height={200}
          width={200}
        />
        <FaUserEdit
          size={40}
          color={"black"}
          onClick={() => {
            history.push("profile/edit");
          }}
        />
      </div>
      <div className="information">
        <p id="your-information">Your Information</p>

        <div className="user-info">
          <p>
            <span> Full Name: </span>
            {result.firstName} {result.lastName}
          </p>
          <p>
            {" "}
            <span>age: </span>
            {result.age}
          </p>
          <p>
            {" "}
            <span>Phone Number: </span>
            {result.phoneNumber}
          </p>
          <p>
            {" "}
            <span>Email: </span>
            {result.email}
          </p>
          <p>
            {" "}
            <span>Gender:</span> {result.gender}
          </p>
          <p>
            {" "}
            <span>country:</span> {result.country}
          </p>
        </div>
      </div>{" "}
      <div className="information scroll">
        <p id="your-information">Your Orders</p>
        {a}
      </div>
    </div>
  );
};

export default Profile;
