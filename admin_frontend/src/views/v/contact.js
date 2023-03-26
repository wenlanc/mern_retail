import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// img
import image1 from "../../assets/images/pages/img-success.png";

const Contact = () => {
  const [show, AccountShow] = useState("A");
  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Contact</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form id="form-wizard1" className="text-center mt-3">
                  <div className="form-card text-start">
                    <Row>
                      <Col md="6">
                        <Form.Group className="form-group">
                          <Form.Label>Email: *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email Id"
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group className="form-group">
                          <Form.Label>Username: *</Form.Label>
                          <Form.Control
                            type="text"
                            name="uname"
                            placeholder="UserName"
                          />
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <Form.Group className="col-md-12 form-group ">
                          <Form.Label>Contact Number: *</Form.Label>
                          <Form.Control
                            type="text"
                            required="required"
                            id="cno"
                            name="cno"
                            placeholder="Contact Number"
                          />
                        </Form.Group>
                        <Form.Group className="col-md-12 form-group mb-3 ">
                          <Form.Label>Address: *</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="address"
                            id="address"
                            rows="5"
                            required="required"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                  <Button
                    variant="primary"
                    name="next"
                    className="next action-button float-end"
                    value="Next"
                    onClick={() => AccountShow("Account")}
                  >
                    Next
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

export default Contact;
