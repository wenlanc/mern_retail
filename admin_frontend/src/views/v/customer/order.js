import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactFlagsSelect from "react-flags-select";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

//import {loadStripe} from '@stripe/stripe-js';

import store1 from "../../../assets/images/store/01.jpg";
import store2 from "../../../assets/images/store/02.jpg";
import store3 from "../../../assets/images/store/03.jpg";
import store4 from "../../../assets/images/store/04.jpg";
import cart from "../../../assets/images/icon/cart.png";
import pageimg from "../../../assets/images/page-img/profile-bg7.jpg";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

//const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CustomerOrder = () => {
  const params = useParams();
  const [formId, setFormId] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formShippingFirstName, setFormShippingFirstName] = useState("");
  const [formBillingFirstName, setFormBillingFirstName] = useState("");
  const [formShippingLastName, setFormShippingLastName] = useState("");
  const [formBillingLastName, setFormBillingLastName] = useState("");
  const [formShippingAddr1, setFormShippingAddr1] = useState("");
  const [formBillingAddr1, setFormBillingAddr1] = useState("");
  const [formShippingAddr2, setFormShippingAddr2] = useState("");
  const [formBillingAddr2, setFormBillingAddr2] = useState("");
  const [formShippingState, setFormShippingState] = useState("");
  const [formBillingState, setFormBillingState] = useState("");
  const [formShippingCountry, setFormShippingCountry] = useState("");
  const [formBillingCountry, setFormBillingCountry] = useState("");
  const [formShippingZip, setFormShippingZip] = useState("");
  const [formBillingZip, setFormBillingZip] = useState("");
  const [status, setStatus] = useState("active");
  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState("cart"); // cart, address, checkout

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  function fetchItem() {
    let url = `${process.env.REACT_APP_SERVER_URL}api/customer/find/${params.id}`;
    axios
      .get(url)
      .then((response) => {
        let res = response.data;
        if (res.error) {
        } else {
          if (res._id) {
            setFormName(res.name);
            setFormId(res._id);
            setFormEmail(res.email);
            setFormPhone(res.phone);
            setFormShippingFirstName(res.shipping_first_name);
            setFormBillingFirstName(res.billing_first_name);
            setFormShippingLastName(res.shipping_last_name);
            setFormBillingLastName(res.billing_last_name);
            setFormShippingAddr1(res.shipping_addr1);
            setFormBillingAddr1(res.billing_addr1);
            setFormShippingAddr2(res.shipping_addr2);
            setFormBillingAddr2(res.billing_addr2);
            setFormShippingState(res.shipping_state);
            setFormBillingState(res.billing_state);
            setFormShippingCountry(res.shipping_country);
            setFormBillingCountry(res.billing_country);
            setFormShippingZip(res.shipping_zip);
            setFormBillingZip(res.billing_zip);
            setStatus(res.status);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (params.id) fetchItem();
  }, []);

  const fetchItems = (searchText) => {
    let formData = {
      searchText,
    };
    let url = `${process.env.REACT_APP_SERVER_URL}api/product/list`;
    axios
      .post(url, formData)
      .then((response) => {
        let res = response.data;
        if (res.error) {
        } else {
          if (res.products) {
            setProducts(res.products);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItems(searchText);
  }, [searchText]);

  let totalPrice = 0;
  selectedProducts.map((item) => {
    totalPrice += item.price * item.count;
  });
  let bagDiscount = 0;

  //const stripe = useStripe();
  //const elements = useElements();
  const payBtn = useRef(null);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  const initialPaypalOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const paymentBtnClick = async () => {
    createOrder();
    
  };

  const createOrder = async () => {
    
    // Requesting create order

    const url = `${process.env.REACT_APP_SERVER_URL}api/order/create`;
      const formData = {
        customerId: formId,
        products: selectedProducts,
        paymentMethod: paymentMethod,
        payAmount: totalPrice,
      };
      const config = {
        headers: {
          //"content-type": "multipart/form-data",
        },
      };
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response.data);
          let res = response.data;
          if (res.error) {
            Swal.fire({
              title: "Error",
              text: "Failed to create!",
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "Successfully created.",
              icon: "success",
              confirmButtonText: "OK",
            });

            if (paymentMethod === "stripe") {
              stripeSubmitHandler();
            }

          }
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "Failed to create!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });

  };

  const stripeSubmitHandler = async () => {
    // if (!stripe || !elements) {
    //   // Stripe.js has not yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return;
    // }
    // payBtn.current.disabled = true;
    // const result = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: "https://example.com/order/123/complete",
    //   },
    // });
    // if (result.error) {
    //   // Show error to your customer (for example, payment details incomplete)
    //   console.log(result.error.message);
    //   payBtn.current.disabled = false;
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Place Order For {formName}</h4>
                </div>
              </Card.Header>
              <Card.Body>
                {show == "cart" && (
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                      leo
                    </p>
                    <Row>
                      <Col lg="4">
                        <p>
                          <b>Products</b>
                        </p>
                        <Card>
                          <Card.Body>
                            <div className="checkout-product">
                              <Row className=" align-items-center">
                                <form className="comment-text d-flex align-items-center">
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    onChange={(event) => {
                                      setSearchText(event.target.value);
                                    }}
                                  />
                                  <div className="comment-attagement d-flex">
                                    <Link to="#">
                                      <i className="ri-search-line me-3"></i>
                                    </Link>
                                  </div>
                                </form>
                              </Row>

                              {products.map((product) => {
                                return (
                                  <div
                                    key={product._id}
                                    className="d-flex justify-content-between mt-2"
                                  >
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                      <div className="user-img">
                                        <img
                                          src={store1}
                                          alt="userimg"
                                          className="avatar-35 rounded-circle img-fluid"
                                        />
                                      </div>
                                      <div className="comment-data-block ms-1">
                                        <span>{product.name}</span>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      {selectedProducts.filter(
                                        (item) => item._id == product._id
                                      ).length == 0 && (
                                        <Link
                                          to="#"
                                          onClick={() => {
                                            product.count = 1;
                                            product.price = 1015;
                                            setSelectedProducts((prev) =>
                                              prev.concat([product])
                                            );
                                          }}
                                          className="chat-icon-phone btn btn-sm bg-soft-primary"
                                        >
                                          Book
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg="8">
                        <p>
                          <b>Shopping Cart</b>
                        </p>
                        {selectedProducts.length == 0 && (
                          <Card>
                            <Card.Body>
                              <div className="checkout-product">
                                <Row className=" align-items-center">
                                  <Col>No product</Col>
                                </Row>
                              </div>
                            </Card.Body>
                          </Card>
                        )}
                        {selectedProducts.length > 0 &&
                          selectedProducts.map((product, index) => {
                            return (
                              <Card key={index}>
                                <Card.Body>
                                  <div className="checkout-product">
                                    <Row className=" align-items-center">
                                      <Col sm="2">
                                        <span className="checkout-product-img">
                                          <Link to="#">
                                            <img
                                              className="img-fluid rounded"
                                              src={store1}
                                              alt=""
                                            />
                                          </Link>
                                        </span>
                                      </Col>
                                      <Col sm="5">
                                        <div className="checkout-product-details">
                                          <h5>{product.name}</h5>
                                          <p className="text-success">
                                            {product.description}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col sm="5">
                                        <Row>
                                          <Col
                                            sm="10"
                                            className="col-10 d-flex justify-content-between"
                                          >
                                            <div className="quantity buttons_added">
                                              <input
                                                type="button"
                                                defaultValue="-"
                                                className="minus h5"
                                                onClick={() => {
                                                  if (
                                                    selectedProducts[index]
                                                      .count > 1
                                                  ) {
                                                    let p = [
                                                      ...selectedProducts,
                                                    ];
                                                    p[index].count =
                                                      p[index].count - 1;
                                                    setSelectedProducts(p);
                                                  }
                                                }}
                                              />
                                              <input
                                                type="text"
                                                value={product.count}
                                                pattern="[0-9]*"
                                                onChange={(event) => {
                                                  let val = event.target.value;
                                                  if (
                                                    val == "" ||
                                                    parseInt(val) == val
                                                  ) {
                                                    let p = [
                                                      ...selectedProducts,
                                                    ];
                                                    p[index].count = val * 1;
                                                    setSelectedProducts(p);
                                                  }
                                                }}
                                                title="Qty"
                                                className="input-text ms-1 me-1 qty text"
                                              />
                                              <input
                                                type="button"
                                                defaultValue="+"
                                                className="plus h5"
                                                onClick={() => {
                                                  let p = [...selectedProducts];
                                                  p[index].count =
                                                    p[index].count + 1;
                                                  setSelectedProducts(p);
                                                }}
                                              />
                                            </div>
                                            <span className="product-price">
                                              ${product.price}
                                            </span>
                                          </Col>
                                          <Col sm="2" className=" col-2">
                                            <Link
                                              to="#"
                                              className="text-dark"
                                              onClick={() => {
                                                setSelectedProducts((prev) =>
                                                  prev.filter(
                                                    (data) =>
                                                      data._id != product._id
                                                  )
                                                );
                                              }}
                                            >
                                              <i className="ri-delete-bin-7-fill h5"></i>
                                            </Link>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card.Body>
                              </Card>
                            );
                          })}

                        {selectedProducts.length > 0 && (
                          <Card>
                            <Card.Body>
                              <p>
                                <b>Order Details</b>
                              </p>
                              <div className="d-flex justify-content-between mb-2">
                                <span>cart({selectedProducts.length})</span>
                                <span>${totalPrice}</span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                <span>Bag Discount</span>
                                <span className="text-success">
                                  {bagDiscount}$
                                </span>
                              </div>
                              <div className="d-flex justify-content-between mb-4">
                                <span>Delivery Charges</span>
                                <span className="text-success">Free</span>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between mb-4">
                                <span className="text-dark">
                                  <strong>Total</strong>
                                </span>
                                <span className="text-dark">
                                  <strong>${totalPrice - bagDiscount}</strong>
                                </span>
                              </div>
                              <Link
                                id="place-order"
                                to="#"
                                className="btn btn-primary d-block mt-3 next"
                                onClick={() => setShow("checkout")}
                              >
                                Place order
                              </Link>
                            </Card.Body>
                          </Card>
                        )}
                      </Col>
                    </Row>
                  </div>
                )}
                {show == "checkout" && (
                  <Row className="align-item-center">
                    <Col lg="4">
                      <Card>
                        <Card.Body>
                          <h4 className="mb-2">Shipping Address:</h4>
                          <div className="shipping-address">
                            <p className="mb-0">9447 Glen Eagles Drive</p>
                            <p>Lewis Center, OH 43035</p>
                            <p>UTC-5: Eastern Standard Time (EST)</p>
                            <p>202-555-0140</p>
                          </div>
                          <hr />
                          <h4 className="mb-2">Billing Address:</h4>
                          <div className="shipping-address">
                            <p className="mb-0">9447 Glen Eagles Drive</p>
                            <p>Lewis Center, OH 43035</p>
                            <p>UTC-5: Eastern Standard Time (EST)</p>
                            <p>202-555-0140</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg="8">
                      <Card>
                        <Card.Body>
                          <p>
                            <b>Order Details</b>
                          </p>
                          <div className="d-flex justify-content-between mb-2">
                            <span>cart({selectedProducts.length})</span>
                            <span>${totalPrice}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Bag Discount</span>
                            <span className="text-success">{bagDiscount}$</span>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <span>Delivery Charges</span>
                            <span className="text-success">Free</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-dark">
                              <strong>Total</strong>
                            </span>
                            <span className="text-dark">
                              <strong>${totalPrice - bagDiscount}</strong>
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Row className="mt-1">
                            <Col md="12">
                              <Form>
                                <Form.Group className="form-group row">
                                  <Form.Label>
                                    <p>
                                      <b>Payment Method:</b>
                                    </p>{" "}
                                  </Form.Label>
                                  <Form.Check className="form-check col-6 d-flex align-items-center">
                                    <Form.Check.Input
                                      type="radio"
                                      id="credit"
                                      name="paymentMethod"
                                      value="stripe"
                                      checked={paymentMethod === "stripe"}
                                      onChange={(event) => {
                                        setPaymentMethod(event.target.value);
                                      }}
                                    />
                                    <Form.Check.Label htmlFor="credit">
                                      <img
                                        src={cart}
                                        alt=""
                                        height="30"
                                        width="30"
                                        style={{ marginLeft: "5px" }}
                                      />{" "}
                                      Credit Card
                                    </Form.Check.Label>
                                  </Form.Check>
                                  <Form.Check className="form-check col-6 d-flex align-items-center">
                                    <Form.Check.Input
                                      type="radio"
                                      id="netbaking"
                                      name="paymentMethod"
                                      value="paypal"
                                      checked={paymentMethod === "paypal"}
                                      onChange={(event) => {
                                        setPaymentMethod(event.target.value);
                                      }}
                                    />
                                    <Form.Check.Label htmlFor="netbaking">
                                      <img
                                        src={cart}
                                        alt=""
                                        height="30"
                                        width="30"
                                        style={{ marginLeft: "5px" }}
                                      />{" "}
                                      Paypal
                                    </Form.Check.Label>
                                  </Form.Check>
                                  <Form.Check className="form-check col-6 d-flex align-items-center">
                                    <Form.Check.Input
                                      type="radio"
                                      id="emi"
                                      name="paymentMethod"
                                      value="check"
                                      checked={paymentMethod === "check"}
                                      onChange={(event) => {
                                        setPaymentMethod(event.target.value);
                                      }}
                                    />
                                    <Form.Check.Label htmlFor="emi">
                                      <img
                                        src={cart}
                                        alt=""
                                        height="30"
                                        width="30"
                                        style={{ marginLeft: "5px" }}
                                      />{" "}
                                      Check
                                    </Form.Check.Label>
                                  </Form.Check>
                                  <Form.Check className="form-check col-6 d-flex align-items-center">
                                    <Form.Check.Input
                                      type="radio"
                                      id="cod"
                                      name="paymentMethod"
                                      value="cash"
                                      checked={paymentMethod === "cash"}
                                      onChange={(event) => {
                                        setPaymentMethod(event.target.value);
                                      }}
                                    />
                                    <Form.Check.Label htmlFor="cod">
                                      <img
                                        src={cart}
                                        alt=""
                                        height="30"
                                        width="30"
                                        style={{ marginLeft: "5px" }}
                                      />{" "}
                                      Cash On Delivery
                                    </Form.Check.Label>
                                  </Form.Check>
                                </Form.Group>
                              </Form>
                            </Col>
                            {/* {paymentMethod === "stripe" && stripe && elements && (
                                // <form>
                                // <Elements stripe={stripePromise} options={options}>
                                //   <PaymentElement />
                                // </Elements>
                                // </form>
                              )} */}

                            {paymentMethod == "paypal" && (
                              <PayPalScriptProvider
                                options={initialPaypalOptions}
                              >
                                <PayPalButtons />
                              </PayPalScriptProvider>
                            )}

                            <Col
                              md="12"
                              className="mt-3 d-flex justify-content-between"
                            >
                              <Button
                                id="savenddeliver"
                                type="button"
                                variant="secondary"
                                onClick={() => setShow("cart")}
                              >
                                Back
                              </Button>
                              <Button
                                id="savenddeliver"
                                type="button"
                                variant="primary"
                                ref={payBtn}
                                onClick={paymentBtnClick}
                              >
                                Checkout
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CustomerOrder;
