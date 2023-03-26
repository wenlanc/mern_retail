import React, { useState, useRef } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactFlagsSelect from "react-flags-select";

const OrderCreate = () => {
  const [selectedValue, setSelectedValue] = useState([]);

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
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirm, setFormPasswordConfirm] = useState("");

  const [validated, setValidated] = useState(false);

  let handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if( formPassword != formPasswordConfirm){
        setFormPassword("");
        setFormPasswordConfirm("");
        setValidated(true);
        event.stopPropagation();
        return;
      } 
      const url = `${process.env.REACT_APP_SERVER_URL}api/customer/create`;
      const formData = {
        formName,
        formEmail,
        formPhone,
        formShippingFirstName,
        formBillingFirstName,
        formShippingLastName,
        formBillingLastName,
        formShippingAddr1,
        formBillingAddr1,
        formShippingAddr2,
        formBillingAddr2,
        formShippingState,
        formBillingState,
        formShippingCountry,
        formBillingCountry,
        formShippingZip,
        formBillingZip,
        formPassword,
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
            handleCancel();
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
    }
  };

  let handleCancel = () => {
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormShippingFirstName("");
    setFormBillingFirstName("");
    setFormShippingLastName("");
    setFormBillingLastName("");
    setFormShippingAddr1("");
    setFormBillingAddr1("");
    setFormShippingAddr2("");
    setFormBillingAddr2("");
    setFormShippingState("");
    setFormBillingState("");
    setFormShippingCountry("");
    setFormBillingCountry("");
    setFormShippingZip("");
    setFormBillingZip("");
    setFormPassword("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">New Order</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  vulputate, ex ac venenatis mollis, diam nibh finibus leo
                </p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="form-group">
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control
                      type="text"
                      //defaultValue=""
                      name="name"
                      value={formName || ""}
                      onChange={(event) => setFormName(event.target.value)}
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      //defaultValue=""
                      name="email"
                      value={formEmail || ""}
                      onChange={(event) => setFormEmail(event.target.value)}
                      placeholder="Enter Email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Password:</Form.Label>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="password"
                          name="formPassword"
                          value={formPassword || ""}
                          onChange={(event) =>
                            setFormPassword(event.target.value)
                          }
                          placeholder="Password"
                          required
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="password"
                          name="formPasswordConfirm"
                          value={formPasswordConfirm || ""}
                          onChange={(event) =>
                            setFormPasswordConfirm(event.target.value)
                          }
                          placeholder="Confirm Password"
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                      type="text"
                      //defaultValue=""
                      name="phone"
                      value={formPhone || ""}
                      onChange={(event) => setFormPhone(event.target.value)}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Shipping Info:</Form.Label>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          name="formShippingFirstName"
                          value={formShippingFirstName || ""}
                          onChange={(event) =>
                            setFormShippingFirstName(event.target.value)
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="formShippingLastName"
                          value={formShippingLastName || ""}
                          onChange={(event) =>
                            setFormShippingLastName(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Address1"
                          name="formShippingAddr1"
                          value={formShippingAddr1 || ""}
                          onChange={(event) =>
                            setFormShippingAddr1(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Address2"
                          name="formShippingAddr2"
                          value={formShippingAddr2 || ""}
                          onChange={(event) =>
                            setFormShippingAddr2(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="State"
                          name="formShippingState"
                          value={formShippingState || ""}
                          onChange={(event) =>
                            setFormShippingState(event.target.value)
                          }
                        />
                      </Col>
                      <Col>
                        {/* <Form.Control type="text" placeholder="Country" /> */}
                        <ReactFlagsSelect
                          defaultCountry="US"
                          //countries={["US", "CN"]}
                          //customLabels={{ US: "EN-US", CN: "CN" }}
                          placeholder="Country"
                          //showSelectedLabel={false}
                          //showOptionLabel={false}
                          selectedSize={11}
                          optionsSize={11}
                          className="menu-flags"
                          alignOptions="left"
                          searchable
                          searchPlaceholder="Search countries"
                          //disabled={true}
                          onSelect={(countryCode) => {
                            console.log(countryCode);
                            setFormShippingCountry(countryCode);
                            //i18n.changeLanguage(countryCode);
                          }}
                          selected={formShippingCountry}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          name="formShippingZip"
                          value={formShippingZip || ""}
                          onChange={(event) =>
                            setFormShippingZip(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Billing Info:</Form.Label>

                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          name="formBillingFirstName"
                          value={formBillingFirstName || ""}
                          onChange={(event) =>
                            setFormBillingFirstName(event.target.value)
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="formBillingLastName"
                          value={formBillingLastName || ""}
                          onChange={(event) =>
                            setFormBillingLastName(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Address1"
                          name="formBillingAddr1"
                          value={formBillingAddr1 || ""}
                          onChange={(event) =>
                            setFormBillingAddr1(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Address2"
                          name="formBillingAddr2"
                          value={formBillingAddr2 || ""}
                          onChange={(event) =>
                            setFormBillingAddr2(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="State"
                          name="formBillingState"
                          value={formBillingState || ""}
                          onChange={(event) =>
                            setFormBillingState(event.target.value)
                          }
                        />
                      </Col>
                      <Col>
                        {/* <Form.Control type="text" placeholder="Country" /> */}
                        <ReactFlagsSelect
                          defaultCountry="US"
                          //countries={["US", "CN"]}
                          //customLabels={{ US: "EN-US", CN: "CN" }}
                          placeholder="Country"
                          //showSelectedLabel={false}
                          //showOptionLabel={false}
                          selectedSize={11}
                          optionsSize={11}
                          className="menu-flags"
                          alignOptions="left"
                          searchable
                          searchPlaceholder="Search countries"
                          //disabled={true}
                          onSelect={(countryCode) => {
                            console.log(countryCode);
                            setFormBillingCountry(countryCode);
                            //i18n.changeLanguage(countryCode);
                          }}
                          selected={formBillingCountry}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          name="formBillingZip"
                          value={formBillingZip || ""}
                          onChange={(event) =>
                            setFormBillingZip(event.target.value)
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>{" "}
                  <Button variant="danger" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderCreate;
