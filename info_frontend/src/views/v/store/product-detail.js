import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

//img
import profilebg4 from "../../../assets/images/page-img/profile-bg4.jpg";

import user5 from "../../../assets/images/user/05.jpg";
import user6 from "../../../assets/images/user/06.jpg";
import user7 from "../../../assets/images/user/07.jpg";
import user8 from "../../../assets/images/user/08.jpg";
import user9 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import user13 from "../../../assets/images/user/13.jpg";
import user14 from "../../../assets/images/user/14.jpg";
import user15 from "../../../assets/images/user/15.jpg";
import user16 from "../../../assets/images/user/16.jpg";
import user17 from "../../../assets/images/user/17.jpg";
import user18 from "../../../assets/images/user/18.jpg";
import user19 from "../../../assets/images/user/19.jpg";

//profile-header
import ProfileHeader from "../../../components/profile-header";

const ProductDetail = () => {
  const params = useParams();
  const [selectedValue, setSelectedValue] = useState([]);
  const [formId, setFormId] = useState("");
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formValues, setFormValues] = useState([
    { size: "", sku: "", cost: "" },
  ]);

  const [sdsFile, setSdsFile] = useState({});
  const [labelFile, setLabelFile] = useState({});
  const [imageFile, setImageFile] = useState({});
  const sdsFileInputRef = useRef();
  const labelFileInputRef = useRef();
  const imageFileInputRef = useRef();
  const [editor, setEditor] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    function fetchItem() {
      let url = `${process.env.REACT_APP_SERVER_URL}api/product/find/${params.id}`;
      axios
        .get(url)
        .then((response) => {
          let res = response.data;
          if (res.error) {
          } else {
            if (res) {
              setFormName(res.name);
              setFormId(res._id);
              setFormValues(JSON.parse(res.items));
              setFormDescription(res.description);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (params.id) fetchItem();
  }, []);

  return (
    <>
      {/* <ProfileHeader title="Birthday" img={profilebg4} /> */}
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <div className="birthday-block">
                <Card>
                  <Card.Header className="d-flex justify-content-between rounded border-bottom-0">
                    <div className="header-title">
                      <h4 className="card-title">Product Detail</h4>
                    </div>
                  </Card.Header>
                </Card>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <div className="iq-birthday-block">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <Link to="#">
                                <img
                                  src={user5}
                                  alt="profile-img"
                                  className="img-fluid"
                                />
                              </Link>
                              <div className="friend-info ms-0 ms-md-3 mt-md-0 mt-2">
                                <h5>Petey Cruiser</h5>
                                <p className="mb-0">Today</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default ProductDetail;
