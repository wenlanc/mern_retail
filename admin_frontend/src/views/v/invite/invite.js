import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// img
import image1 from "../../../assets/images/pages/img-success.png";

const Invite = () => {

  const [show, AccountShow] = useState("A");
  const [validated, setValidated] = useState(false);
  const [formEmail, setFormEmail] = useState('');

  const handleSendInvite = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      
      const url = `${process.env.REACT_APP_SERVER_URL}api/invite/create`;
      const formData = {
        formEmail,
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
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Invite</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="sign-in-from">
                  <h1 className="mb-0">Invite a customer</h1>
                  <p>
                    Enter customer's email address and we'll send you an email with
                    instructions to register customer information.
                  </p>
                  <Form noValidate validated={validated} onSubmit={handleSendInvite}>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        className="mb-0"
                        id="formEmail"
                        name="formEmail"
                        value={formEmail}
                        onChange={(e)=>{setFormEmail(e.target.value)}}
                        placeholder="Enter email"
                        required
                      />
                    </Form.Group>
                    <div className="d-inline-block w-100">
                      <Button
                        variant="primary"
                        type="submit"
                        className="float-right mt-3"
                      >
                        Send Invitition
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Invite;
