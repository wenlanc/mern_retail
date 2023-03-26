import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductEdit = () => {
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

  useEffect(() => {
    if (params.id) fetchItem();
  }, []);

  useEffect(() => {
    if (editor && editor.data) {
      editor.data.set(formDescription);
    }
  }, [formDescription]);

  // handle onChange event of the dropdown
  const handleChange1 = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { size: "", sku: "", cost: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    const url = `${process.env.REACT_APP_SERVER_URL}api/product/update`;
    const formData = new FormData();
    formData.append("id", formId);
    formData.append("name", formName);
    formData.append("description", formDescription);
    formData.append("items", JSON.stringify(formValues));
    formData.append("sdsFile", sdsFile);
    formData.append("imageFile", imageFile);
    formData.append("labelFile", labelFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
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
  };

  let handleCancel = () => {
    fetchItem();
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">New Product</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  vulputate, ex ac venenatis mollis, diam nibh finibus leo
                </p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="form-group">
                    <Form.Label>Product Name</Form.Label>
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
                    <Form.Label>Description</Form.Label>

                    {/* <Form.Control
                      as="textarea"
                      rows="5"
                      name="name"
                      value={form.name || ""}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="Enter Name"
                    ></Form.Control> */}

                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Please input the description!</p>"
                      onReady={(editor) => {
                        console.log(
                          "CKEditor5 React Component is ready to use!",
                          editor
                        );
                        setEditor(editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setFormDescription(data);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    {formValues.map((element, index) => (
                      <Form.Group as={Row} className="form-group" key={index}>
                        <Row>
                          <Col sm={3} className="mt-1">
                            <Form.Control
                              type="text"
                              placeholder="SKU"
                              name="sku"
                              value={element.sku || ""}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </Col>
                          <Col sm={3} className="mt-1">
                            <Form.Control
                              type="text"
                              placeholder="Size"
                              name="size"
                              value={element.size || ""}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </Col>
                          <Col sm={3} className="mt-1">
                            <Form.Control
                              type="text"
                              placeholder="Cost"
                              name="cost"
                              value={element.cost || ""}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </Col>
                          <Col sm={3} className="mt-1">
                            {formValues.length > 1 ? (
                              <div className="edit-relation">
                                <Link
                                  to="#"
                                  onClick={() => removeFormFields(index)}
                                >
                                  <i className="ri-delete-bin-6-fill me-2"></i>
                                  Delete
                                </Link>
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </Form.Group>
                    ))}
                    {formValues.length < 10 && (
                      <Row>
                        <Col sm={3} mt={1}>
                          <div
                            className="d-flex mb-2 align-items-center"
                            onClick={() => addFormFields()}
                          >
                            <i className="ri-add-fill"></i>
                            <h6>Add Item</h6>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label className="custom-file-input">
                      Product SDS file
                    </Form.Label>{" "}
                    <Form.Control
                      type="file"
                      id="sdsFile"
                      ref={sdsFileInputRef}
                      onChange={(event) => setSdsFile(event.target.files[0])}
                      accept=".png,.jpg,.jpeg,.webp"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label className="custom-file-input">
                      Product Label file
                    </Form.Label>{" "}
                    <Form.Control
                      type="file"
                      id="labelFile"
                      ref={labelFileInputRef}
                      onChange={(event) => setLabelFile(event.target.files[0])}
                      accept=".pdf"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label className="custom-file-input">
                      Product Image File
                    </Form.Label>{" "}
                    <Form.Control
                      type="file"
                      id="imageFile"
                      ref={imageFileInputRef}
                      onChange={(event) => setImageFile(event.target.files[0])}
                      accept=".pdf"
                    />
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

export default ProductEdit;
