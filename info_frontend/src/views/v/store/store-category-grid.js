import React, { useState, useEffect } from "react";
import {Row,Col,Button,Container,Dropdown,Tooltip,OverlayTrigger,Form} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

//img
import user1 from '../../../assets/images/user/01.jpg'
import user2 from '../../../assets/images/user/02.jpg'
import user3 from '../../../assets/images/user/03.jpg'
import user4 from '../../../assets/images/user/04.jpg'
import user5 from '../../../assets/images/user/05.jpg'
import user6 from '../../../assets/images/user/06.jpg'
import user7 from '../../../assets/images/user/07.jpg'
import user8 from '../../../assets/images/user/08.jpg'

import store1 from '../../../assets/images/store/01.jpg'
import store2 from '../../../assets/images/store/02.jpg'
import store3 from '../../../assets/images/store/03.jpg'
import store4 from '../../../assets/images/store/04.jpg'
import store5 from '../../../assets/images/store/05.jpg'
import store6 from '../../../assets/images/store/06.jpg'
import store7 from '../../../assets/images/store/07.jpg'
import store8 from '../../../assets/images/store/08.jpg'
import profilebg7 from '../../../assets/images/page-img/profile-bg7.jpg' 

import ProfileHeader from '../../../components/profile-header'

const CatergoryGrid = () => {

   const [items, setItems] = useState([]);
   const [searchText, setSearchText] = useState('');
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [page, setPage] = useState(0);
   const [order, setOrder] = useState({});
   const [totalItems, setTotalItems] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
    const [selected, setSelected] = useState([]);
 
   let navigate = useNavigate();
 
   const fetchItems = (searchText, rowsPerPage, page, order) => {
     let formData = {
       searchText, rowsPerPage, page, order
     };
     let url = `${process.env.REACT_APP_SERVER_URL}api/product/list`;
     axios.post(url, formData).then((response) => {
       console.log(response.data);
       let res = response.data;
       if(res.error){
         
       } else {
         if(res.products)
         {
           setItems(res.products);
           setTotalItems(res.totalItems);
           setTotalPages(res.pages);
         }
       }
     }).catch((error)=>{
       console.log(error)
     });
   }
 
   useEffect(() => {
       fetchItems(searchText, rowsPerPage, page, order);
    }, [ searchText, rowsPerPage, page, order]);
 
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
          setSelected(items.map(n => n.id));
          return;
       }
       setSelected([]);
    }
 
    function handleClick(item) {
       navigate(`/products/edit`);
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
          newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
       }
 
       setSelected(newSelected);
    }
 
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       cancelButton: 'btn btn-outline-primary btn-lg ms-2',
       confirmButton: 'btn btn-primary btn-lg',   
     },
     buttonsStyling: false
   })
  
   return (
     <>
       {/* <ProfileHeader title="Welcome to store" img={profilebg7} /> */}
       <div id="content-page" className="content-page">
         {/* <Container> */}
         <Row>
           <Col lg="3" xl="2">
             <Card>
               <Card.Header className="d-flex justify-content-between">
                 <div className="header-title">
                   <h4 className="card-title">Search</h4>
                 </div>
               </Card.Header>
               <Card.Body>
                 <Form className="position-relative">
                   <Form.Group className="form-group iq-todo-page mb-0">
                     <Form.Control
                       type="text"
                       className="form-control todo-search"
                       id="exampleInputEmail002"
                       placeholder="Search"
                     />
                     <Link className="search-link" to="#">
                       <i className="ri-search-line"></i>
                     </Link>
                   </Form.Group>
                 </Form>
               </Card.Body>
             </Card>
             {/* <Card>
                 <Card.Header className="d-flex justify-content-between">
                   <div className="header-title">
                     <h4 className="card-title">Store Categories</h4>
                   </div>
                 </Card.Header>
                 <Card.Body>
                   <Form.Check className="form-check d-block mb-2">
                     <Form.Check.Input type="checkbox" id="customCheck1" />
                     <Form.Check.Label htmlFor="customCheck1">
                       All Categories
                     </Form.Check.Label>
                   </Form.Check>
                   <Form.Check className="form-check d-block mb-2">
                     <Form.Check.Input type="checkbox" id="customCheck2" />
                     <Form.Check.Label htmlFor="customCheck2">
                       PSD Templates
                     </Form.Check.Label>
                   </Form.Check>
                   <Form.Check className="form-check d-block mb-2">
                     <Form.Check.Input type="checkbox" id="customCheck3" />
                     <Form.Check.Label htmlFor="customCheck3">
                       HTML Templates
                     </Form.Check.Label>
                   </Form.Check>
                   <Form.Check className="form-check d-block mb-2">
                     <Form.Check.Input type="checkbox" id="customCheck4" />
                     <Form.Check.Label htmlFor="customCheck4">
                       WP Templates
                     </Form.Check.Label>
                   </Form.Check>
                   <Form.Check className="form-check d-block mb-2">
                     <Form.Check.Input type="checkbox" id="customCheck5" />
                     <Form.Check.Label htmlFor="customCheck5">
                       Stream Packs
                     </Form.Check.Label>
                   </Form.Check>
                   <Form.Check className="form-check d-block">
                     <Form.Check.Input type="checkbox" id="customCheck6" />
                     <Form.Check.Label htmlFor="customCheck6">
                       Logos and Badges
                     </Form.Check.Label>
                   </Form.Check>
                 </Card.Body>
               </Card> */}
             <Card>
               <Card.Header className="d-flex justify-content-between">
                 <div className="header-title">
                   <h4 className="card-title">Price Range</h4>
                 </div>
               </Card.Header>
               <Card.Body>
                 <div className="d-flex align-items-center">
                   <Form.Group className="form-group me-3">
                     <label htmlFor="name01">From:</label>
                     <Form.Control type="text" id="name01" defaultValue="$  " />
                   </Form.Group>
                   <Form.Group className="form-group">
                     <label htmlFor="to">To:</label>
                     <Form.Control type="text" id="to" defaultValue="$" />
                   </Form.Group>
                 </div>
                 <Button type="submit" variant="primary w-100q">
                   Apply
                 </Button>
               </Card.Body>
             </Card>
             {/* <Card>
                 <Card.Header className="d-flex justify-content-between">
                   <div className="header-title">
                     <Card.Header.Title as="h4">Reviews</Card.Header.Title>
                   </div>
                 </Card.Header>
                 <Card.Body>
                   <div className="d-flex align-items-center justify-content-between mb-3">
                     <Form.Check className="form-check d-flex align-items-center">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio1"
                         defaultChecked
                       />
                       <Form.Check.Label
                         htmlFor="radio1"
                         className=" mb-0 ps-2"
                       >
                         <b>Al Reviews</b>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">6870</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mb-2">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio2"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio2" className=" mb-0">
                         <span className=" text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">1023</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mb-2">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio3"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio3" className=" mb-0">
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fas fa-star-half-alt"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">1000</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mb-2">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio4"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio4" className="mb-0">
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="far fa-star"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">982</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mb-2">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio5"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio5" className=" mb-0">
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">204</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between mb-2">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio6"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio6" className=" mb-0">
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">50</h6>
                   </div>
                   <div className="d-flex align-items-center justify-content-between">
                     <Form.Check className="form-check d-inline-block">
                       <Form.Check.Input
                         type="radio"
                         name="bsradio"
                         id="radio7"
                         defaultChecked
                       />
                       <Form.Check.Label htmlFor="radio7" className="mb-0">
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                         </span>
                       </Form.Check.Label>
                     </Form.Check>
                     <h6 className="text-primary">8</h6>
                   </div>
                 </Card.Body>
               </Card> */}
           </Col>
           <Col lg="9" xl="10">
             <Row>
               {items.map((item) => (
                 <Col key={item.name} sm="6" md="4" lg="4" xl="3">
                   <Card className="card-block card-stretch card-height product">
                     <Card.Body>
                       <div className="d-flex align-items-center justify-content-between pb-3">
                         <div className="d-flex align-items-center">
                           <img
                             className="img-fluid rounded-circle avatar-30"
                             src={user1}
                             alt=""
                           />
                           <div className="media-body ms-2">
                             <p className="mb-0 line-height">Posted By</p>
                             <h6>
                               <Link to="#">Bearded Wonder</Link>
                             </h6>
                           </div>
                         </div>
                         <span className="text-warning d-block line-height">
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                           <i className="fa fa-star"></i>
                         </span>
                       </div>
                       <div className="image-block position-relative">
                         <img
                           src={store1}
                           className="img-fluid w-100 rounded"
                           alt="product-img"
                         />
                         {item.imageFile ? (
                           <div className="offer">
                             <div className="offer-title">20%</div>
                           </div>
                         ) : (
                           <div className="offer bg-danger">
                             <div className="offer-title">50%</div>
                           </div>
                         )}
                         <h6 className="price">
                           <span className="regular-price text-dark pr-2">
                             $87.00
                           </span>
                           $75.00
                         </h6>
                       </div>
                       <div className="product-description mt-3">
                         <h6 className="mb-1">
                           <Link className="search-link" to={"/product-detail/"+item._id}>
                             <i className="ri-share-forward-line"></i>
                             {item.name}
                           </Link>
                         </h6>
                         {/* <span className="categry text-primary ps-3 mb-2 position-relative">
                           Logo and badges
                         </span> */}
                         <p className="mb-0">{item.description}</p>
                       </div>
                     </Card.Body>
                   </Card>
                 </Col>
               ))}
             </Row>
           </Col>
         </Row>
         {/* </Container> */}
       </div>
     </>
   );
}

export default CatergoryGrid