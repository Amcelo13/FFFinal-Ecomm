import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";

function CategoryProducts({ cateGory }) {
  console.log(cateGory);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  //Getting Category Products
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(`http://localhost:4000/getCategoryProducts/${cateGory}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProducts();
    //Animations
    const productElement = document.getElementById("prof");
    productElement.classList.add("enter");
    return () => {
      productElement.classList.remove("enter");
    };
  }, [cateGory]);

  //going to product page
  const goToProductPage = (id) => {
    navigate("/productPage", { state: id });
  };
  return (
    <div className="pro--container">
      <div className="prodDiv" id="prof">
        {product &&
          product.map((prod) => {
            if (prod.stock === 1) {
              return (
                <div
                  className="one-prod"
                  key={prod.name}
                  onClick={() => goToProductPage(prod._id)}
                >
                  <img
                    src={prod.prodImage}
                    alt="err"
                    width="95%"
                    id="prodimage"
                  />
                  <div className="info">
                    <h3 style={{ textAlign: "left", paddingLeft: "1rem" }}>
                      {prod.name}
                    </h3>
                    <h4 style={{ color: "gray", paddingRight: "1rem" }}>
                      ₹{prod.price}
                    </h4>
                  </div>
                  <p id="cat">{prod.category}</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default CategoryProducts;
