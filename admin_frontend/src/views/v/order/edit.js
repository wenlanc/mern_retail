import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Container, Card, Image } from "react-bootstrap";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactFlagsSelect from "react-flags-select";
import logo from '../../../assets/images/logo.png'

const OrderEdit = () => {
  const [selectedValue, setSelectedValue] = useState([]);
  const params = useParams();
  const [formId, setFormId] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [payAmount, setPayAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [createdAt, setCreatedAt] = useState("");
  const [validated, setValidated] = useState(false);

  function fetchItem() {
    let url = `${process.env.REACT_APP_SERVER_URL}api/order/find/${params.id}`;
    axios
      .get(url)
      .then((response) => {
        let res = response.data;
        if (res.error) {
        } else {
          if (res._id) {
            setFormId(res._id);
            setCustomerInfo(res.customerId);
            setOrderItems(res.items);
            setPayAmount(res.payAmount);
            setCreatedAt(res.createdAt);
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


  const handleCancel = () => {
    fetchItem();
  };


  return (
    <>
      <Container>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Body>
                                <Row>
                                <Col lg="6">
                                        <Image src={logo} className="img-fluid w-25" alt=""/>
                                    </Col>
                                    <Col lg="6" className="align-self-center">
                                        <h4 className="mb-0 float-end">Invoice</h4>
                                    </Col>
                                    <Col sm="12">
                                        <hr className="mt-3"/>
                                        <h5 className="mb-0">Hello, Bni Cysts</h5>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <div className="table-responsive-sm">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order Date</th>
                                                        <th scope="col">Order Status</th>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Billing Address</th>
                                                        <th scope="col">Shipping Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{createdAt}</td>
                                                        <td><span className="badge bg-danger">{status}</span></td>
                                                        <td>250028</td>
                                                        <td>
                                                            <p className="mb-0">
                                                                PO Box 16122 Collins Street West<br/>Victoria 8007 Australia<br/>
                                                                Phone: +123 456 7890<br/>
                                                                Email: demo@SocialV.com<br/>
                                                                Web: www.SocialV.com
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p className="mb-0">PO Box 16122 Collins Street West<br/>Victoria 8007 Australia<br/>
                                                                Phone: +123 456 7890<br/>
                                                                Email: demo@SocialV.com<br/>
                                                                Web: www.SocialV.com
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </Row>            
                                <Row>
                                    <Col sm="12">
                                        <h5>Order Summary</h5>
                                        <div className="table-responsive-sm">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center" scope="col">#</th>
                                                        <th scope="col">Item</th>
                                                        <th className="text-center" scope="col">Quantity</th>
                                                        <th className="text-center" scope="col">Price</th>
                                                        <th className="text-center" scope="col">Totals</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orderItems.map((item,idx) => (
                                                            <tr key={idx}>
                                                                <th className="text-center" scope="row">{idx + 1}</th>
                                                                <td>
                                                                <h6 className="mb-0">{item.name}</h6>
                                                                <p className="mb-0">{item.desc}</p>
                                                                </td>
                                                                <td className="text-center">{item.count}</td>
                                                                <td className="text-center">{item.price}</td>
                                                                <td className="text-center"><b>{item.count * item.price}</b></td>
                                                            </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <h5 className="mt-5">Order Details</h5>
                                        <div className="table-responsive-sm">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Bank</th>
                                                        <th scope="col">.Acc.No</th>
                                                        <th scope="col">Due Date</th>
                                                        <th scope="col">Sub-total</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Threadneedle St</th>
                                                        <td>12333456789</td>
                                                        <td>12 November 2019</td>
                                                        <td>$4597.50</td>
                                                        <td>10%</td>
                                                        <td><b>$4137.75 USD</b></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                    <Col sm="6"></Col>
                                    <Col sm="6" className="text-end">
                                        <Link to="#" className="me-2"><i className="ri-printer-line"></i> Download Print</Link>
                                        <Button>Submit</Button>
                                    </Col>
                                    <Col sm="12" className="mt-5">
                                        <b className="text-danger">Notes:</b>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>                  
                </Row>
            </Container>
    </>
  );
};

export default OrderEdit;
