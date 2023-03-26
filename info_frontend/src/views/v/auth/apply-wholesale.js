import React, { useState, useRef } from "react";
import { Row, Col, Container, Form, Button, Image, Modal, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
//import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.png";
import login2 from "../../../assets/images/login/2.png";
import login3 from "../../../assets/images/login/3.png";
import Quiz from "../../../components/v/quiz/quiz"

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const ApplyWholesale = () => {
  const initState = {
    business_type: "Store",
    full_name: "",
    business_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };

  let navigate = useNavigate();
  const [form, setForm] = useState(initState);
  const [validated, setValidated] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleApply = (event) => {
    //console.log(form);
    event.preventDefault();
    const formE = event.currentTarget;
    if (formE.checkValidity() === false) {
      //event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      setShowQuizModal(true);

       let url = `${process.env.REACT_APP_SERVER_URL}api/auth/apply_wholesale`;
       axios.post(url, form).then((response) => {
         console.log(response.data);
         let res = response.data;
         if(res.error){
            Swal.fire({
               title: "Error",
               text: res.error,
               icon: "error",
               confirmButtonText: "OK",
             });
         } else {
            Swal.fire({
               title: "success",
               text: "Successfully created!",
               icon: "success",
               confirmButtonText: "OK",
             });
         }
       }).catch((error)=>{
         console.log(error)
       });

    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    setForm(initState);
  };

  const handleQuizClose = () => {
   setShowQuizModal(false);
  }

  const onQuizFinish = (score) => {
    if (score > 0) {
    }
  };

  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image
                        src={login1}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login2}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login3}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-4 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h2 className="mb-0">Apply to Wholesale</h2>
                <p>Enter your informations in detail.</p>
                <Form noValidate validated={validated} onSubmit={handleApply}>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="business_type"
                    >
                      Business Type:
                    </Form.Label>
                    <Col sm={8}>
                      <select
                        className="form-select"
                        name="business_type"
                        id="business_type"
                        value={form.business_type}
                        onChange={handleChange}
                        required
                      >
                        <option>Store</option>
                        <option>Farm</option>
                        <option>Other</option>
                      </select>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="full_name"
                    >
                      Full Name:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="full_name"
                        id="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="business_name"
                    >
                      Business Name:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="business_name"
                        id="business_name"
                        value={form.business_name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="email"
                    >
                      Email:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="email"
                        className="mb-0"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="address1"
                    >
                      Address 1:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="address1"
                        id="address1"
                        value={form.address1}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="address2"
                    >
                      Address 2:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="address2"
                        id="address2"
                        value={form.address2}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="city"
                    >
                      City:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="city"
                        id="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="state"
                    >
                      State:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="state"
                        id="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="zip"
                    >
                      Zip:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="zip"
                        id="zip"
                        value={form.zip}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-group mb-2">
                    <Form.Label
                      column
                      sm={4}
                      className="control-label align-self-center mb-0"
                      htmlFor="phone"
                    >
                      Phone:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        className="mb-0"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Form.Group>
                  {/* <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" className="mb-0" id="exampleInputPassword1" placeholder="Password"/>
                           </Form.Group> */}
                  <div className="d-inline-block w-100">
                    {/* <Form.Check className="d-inline-block mt-2 pt-1">
                      <Form.Check.Input
                        type="checkbox"
                        className="me-2"
                        id="customCheck1"
                      />
                      <Form.Check.Label>
                        I accept <Link to="#">Terms and Conditions</Link>
                      </Form.Check.Label>
                    </Form.Check> */}
                    {/* <Button
                      type="submit"
                      className="btn-primary float-end"
                      //onClick={handleApply}
                    >
                      Apply to Wholesale
                    </Button> */}

                    <Button
                      type="button"
                      onClick={handleCancel}
                      className="btn-danger float-end"
                    >
                      Cancel
                    </Button>
                    <Button className="btn-primary" type="submit">
                      Submit
                    </Button>
                  </div>
                  {/* <div className="sign-info">
                              <span className="dark-color d-inline-block line-height-2">Already Have Account ? <Link to="/wholesale_signin">Log In</Link></span>
                              <ul className="iq-social-media">
                                 <li><Link to="#"><i className="ri-facebook-box-line"></i></Link></li>
                                 <li><Link to="#"><i className="ri-twitter-line"></i></Link></li>
                                 <li><Link to="#"><i className="ri-instagram-line"></i></Link></li>
                              </ul>
                           </div> */}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showQuizModal} onHide={handleQuizClose} size="lg">
        <Modal.Header className="d-flex justify-content-between" closeButton>
          <h5 className="modal-title" id="post-modalLabel">
            Quiz
          </h5>
        </Modal.Header>
        <Modal.Body>
          <Quiz 
            onFinish = {onQuizFinish}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ApplyWholesale;
