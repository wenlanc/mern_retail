import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Tooltip,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import Swal from "sweetalert2";

const OrderList = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected] = useState([]);

  let navigate = useNavigate();

  const fetchItems = (searchText, rowsPerPage, page, order) => {
    let formData = {
      searchText,
      rowsPerPage,
      page,
      order,
    };
    let url = `${process.env.REACT_APP_SERVER_URL}api/order/list`;
    axios
      .post(url, formData)
      .then((response) => {
        let res = response.data;
        if (res.error) {
        } else {
          if (res.orders) {
            setItems(res.orders);
            setTotalItems(res.totalItems);
            setTotalPages(res.pages);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItems(searchText, rowsPerPage, page, order);
  }, [searchText, rowsPerPage, page, order]);

  function handleSortingChange(accessor) {
    let _direction = "desc";
    if (order._id === accessor && order._direction === "desc") {
      _direction = "asc";
    }
    setOrder({
      _direction,
      _id: accessor,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(items.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      cancelButton: "btn btn-outline-primary btn-lg ms-2",
      confirmButton: "btn btn-primary btn-lg",
    },
    buttonsStyling: false,
  });

  function handleDelete(item) {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "cancel",
        confirmButtonText: "Yes, delete it!",

        reverseButtons: false,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          //Request delete to server
          let url = `${process.env.REACT_APP_SERVER_URL}api/order/delete/${item._id}`;
          axios
            .get(url)
            .then((response) => {
              console.log(response.data);
              let res = response.data;
              if (res.error) {
                swalWithBootstrapButtons.fire({
                  title: "Failed to Delete!",
                  text: "Your Request has not been deleted.",
                  icon: "error",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
              } else {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your Request has been deleted.",
                  icon: "success",
                  showClass: {
                    popup: "animate__animated animate__zoomIn",
                  },
                  hideClass: {
                    popup: "animate__animated animate__zoomOut",
                  },
                });
                fetchItems(searchText, rowsPerPage, page, order);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Your Request is safe!",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          });
        }
      });
  }

  function handleChangePage(value) {
    setPage(value.selected);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const columns = [
    {
      label: "Customer",
      accessor: "customer_name",
      sortable: true,
    },
    {
      label: "Order Date",
      accessor: "createdAt",
      sortable: true,
    },
    {
      label: "Deliver On",
      accessor: "deliverAt",
      sortable: false,
    },
    {
      label: "Total",
      accessor: "total",
      sortable: false,
    },
    {
      label: "Invoice",
      accessor: "status",
      sortable: false,
    },
    {
      label: "Status",
      accessor: "status",
      sortable: false,
    },
    {
      label: "Action",
      accessor: "action",
      sortable: false,
    },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Orders</h4>
                </div>
                <div className="card-header-toolbar d-flex align-items-center">
                  {/* <Link
                    to="/orders/create"
                    className="chat-icon-phone btn bg-soft-primary"
                  >
                    Place Order
                  </Link> */}
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Row className="justify-content-between d-flex">
                    <Col sm="12" md="6">
                      <div
                        id="user_list_datatable_info"
                        className="dataTables_filter"
                      >
                        <div className="form-group mb-0">
                          <input
                            type="search"
                            className="form-control"
                            id="exampleInputSearch"
                            placeholder="Search"
                            value={searchText}
                            onChange={(event) => {
                              setSearchText(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <table className="files-lists table table-striped mt-4">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div className=" text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </div>
                        </th>
                        {columns.map(({ label, accessor, sortable }) => {
                          return (
                            <th
                              scope="col"
                              key={accessor}
                              onClick={() =>
                                sortable && handleSortingChange(accessor)
                              }
                            >
                              {label}
                              {sortable && (
                                <span>
                                  {order._id && order._id === accessor
                                    ? order._direction === "asc"
                                      ? "↓"
                                      : "↑"
                                    : "↕︎"}
                                </span>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="text-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{item.customerId.name}</td>
                          <td>{item.createdAt}</td>
                          <td></td>
                          <td>{item.payAmount}</td>
                          <td></td>
                          <td>{item.status}</td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Invoice</Tooltip>}
                              >
                                <Link to={"/orders/edit/" + item._id}>
                                  <i className="ri-question-answer-line"></i>
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <Link
                                  to="#"
                                  onClick={() => {
                                    handleDelete(item);
                                  }}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </Link>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Form.Group as={Row} className="form-group mb-4">
                    <Col sm={3}>
                      <Form.Group as={Row} className="form-group">
                        <Col>
                          <Form.Control
                            as="select"
                            aria-label="select example"
                            required
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                          >
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                          </Form.Control>
                        </Col>
                        <Col style={{ margin: "auto" }}>
                          <Form.Label
                            className="form-label"
                            htmlFor="validationCustom01"
                          >
                            per page
                          </Form.Label>
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={9}>
                      <ReactPaginate
                        previousLabel="«"
                        nextLabel="»"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        //pageRangeDisplayed={rowsPerPage}
                        onPageChange={handleChangePage}
                        containerClassName="pagination justify-content-end"
                        activeClassName="active"
                        //forcePage={10}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default OrderList;
