import React, { useState, useEffect } from "react";
import { Modal, Checkbox } from "antd";
import LoadingOutlined from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleOutOfStock } from "../utils/handleOutOfStock";
function ProductModalForm({ open, setOpen, formValues, outOfStockActivator }) {
  const vendorEmail = useSelector((state) => state.users.email);
  const [loading, setLoading] = useState(false);
  const [loadingOutOfStock, setloadingOutOfStock] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Appliances");
  const [file, setFile] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [someData, setSomeData] = useState(false);

  //Prepopulation of MOdal form
  useEffect(() => {
    if (formValues) {
      setProductName(formValues.name || "");
      setProductPrice(formValues.price || "");
      setProductDescription(formValues.description || "");
      setProductCategory(formValues.category || "Appliances");
      setIsDraft(formValues.isDraft || false);
      setSomeData(true);
    }
  }, [formValues]);

  const handleFile = (e) => {
    const newFile = e.target.files;
    setFile([...file, newFile]);
  };

  // Adding/Editing
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const productObj = {
      name: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      vendorID: vendorEmail,
      isDraft: isDraft,
      prodImage:
        "https://www.aptronixindia.com/media/catalog/product/i/p/iphone1164gbpurple_2.png",
    };

    //Adding the Product
    await axios
      .post("http://localhost:4000/products", productObj)
      .then((response) => {
        console.log("Product saved successfully ");
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
    setOpen(false);
  };

  const OutOfStock = (productID) => {
    setloadingOutOfStock(true);
    handleOutOfStock(productID);
    setloadingOutOfStock(false);
    setOpen(false);
  };
  return (
    <Modal
      title={someData ? "Edit Product" : "Add Product"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={1200}
      footer={null}
    >
      <div className="profi">
        <form onSubmit={handleSubmit}>
          <div className="modalcontainer">
            <div className="modalLeft">
              <input
                filename={file}
                onChange={(e) => handleFile(e)}
                type="file"
                accept="image/*"
              />
              <input
                filename={file}
                onChange={(e) => handleFile(e)}
                type="file"
                accept="image/*"
              />
              <input
                filename={file}
                onChange={(e) => handleFile(e)}
                type="file"
                accept="image/*"
              />
              <input
                filename={file}
                onChange={(e) => setFile(e.target.files[4])}
                type="file"
                accept="image/*"
              />
            </div>

            <div className="modalRight">
              <p className="rightiu">Product Name</p>
              <input
                type="text"
                className="rightium"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <p className="rightiu">Product Category</p>
              <select
                name=""
                id=""
                required
                className="rightium1"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="Appliances">Appliances</option>
                <option value="Clothes">Clothes</option>
                <option value="Shoes">Shoes</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Bags">Bags</option>
              </select>

              <p className="rightiu">Description</p>
              <textarea
                required
                name=""
                id=""
                cols="20"
                maxLength="30"
                className="rightium"
                style={{ resize: "none" }}
                rows="10"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>

              <p className="rightiu">Price</p>
              <input
                required
                type="number"
                minValue="0"
                className="rightium"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />

              <span>
                {" "}
                <Checkbox
                  onChange={(e) => setIsDraft(e.target.checked)}
                  checked={isDraft}
                >
                  <p id="bg">
                    <b>Add to Draft</b>
                  </p>
                </Checkbox>
              </span>
             {formValues?.stock === 0 ? ( <b style={{color:'red', marginLeft:"10rem"}}>It is Marked Out of Stock </b>):''}
              <input
                type="text"
                minValue="0"
                value={vendorEmail}
                style={{ visibility: "hidden" }}
              />

              <div className="stockflex" style={{ display: "flex" }}>
                <button
                  type="submit"
                  id="add-new-product"
                  style={{
                    width: "40%",
                    paddingBottom: ".6rem",
                    paddingTop: ".6rem",
                    marginRight: "2rem",
                    cursor: "pointer",
                    backgroundColor: "#f6851c",
                    color: "white",
                    marginTop: "4rem",
                    border: "none",
                    borderRadius: ".3rem",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingOutlined style={{ color: "white" }} />
                  ) : (
                    `${someData ? "Edit" : "Add"}`
                  )}
                </button>

                {someData && outOfStockActivator ? (
                  <button
                    // type="submit"  removing this not requires in out od stock
                    id="add-new-product"
                    style={{
                      width: "40%",
                      paddingBottom: ".6rem",
                      paddingTop: ".6rem",
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                      marginTop: "4rem",
                      border: "none",
                      borderRadius: ".3rem",
                    }}
                    onClick={() => OutOfStock(formValues._id)}
                    disabled={loadingOutOfStock}
                  >
                    {loading ? (
                      <LoadingOutlined style={{ color: "white" }} />
                    ) : (
                      "Mark Out of Stock"
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProductModalForm;
