import React, {useState, useContext, useEffect} from 'react'
import { Link , useLocation} from 'react-router-dom'
import {Accordion, useAccordionButton, AccordionContext} from 'react-bootstrap'
import Scrollbar from 'smooth-scrollbar'

function CustomToggle({ children, eventKey, onClick }) {

   const { activeEventKey } = useContext(AccordionContext);

   const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({state: !active, eventKey: eventKey}));

   const isCurrentEventKey = activeEventKey === eventKey;
 
   return (
     <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
       decoratedOnClick(isCurrentEventKey)
     }}>
       {children}
     </Link>
   );
 }
const Sidebar = () => { 
   useEffect(
      () =>{
          Scrollbar.init(document.querySelector('#sidebar-scrollbar'))
   })
   const [activeMenu, setActiveMenu] = useState(false)
   let location = useLocation();
      return (
         <>
            <div className="iq-sidebar">
               <div id="sidebar-scrollbar">
                  <nav className="iq-sidebar-menu">
                     <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
                        <li className={`${location.pathname.indexOf("/products") > -1 ? 'active' : ''}`}>
                           <Link to="/products" ><i className="las la-check-circle"></i><span>Products</span></Link>
                        </li>
                        <li className={`${location.pathname.indexOf("/customers") > -1 ? 'active' : ''}`}>
                           <Link to="/customers" ><i className="las la-user-friends"></i><span>Customers</span></Link>
                        </li>
                        <li className={`${location.pathname.indexOf("/orders") > -1 ? 'active' : ''}`}>
                           <Link to="/orders">
                              <i className="ri-list-check-2"></i>Orders
                           </Link>
                        </li>
                        <li className={`${location.pathname === '/invite' ? 'active' : ''}`}>
                           <Link to="/invite">
                              <i className="ri-edit-line"></i>Invite
                           </Link>
                        </li>
                     </Accordion>
                  </nav>
                  <div className="p-5"></div>
               </div>
            </div>
         </>
   )
}

export default Sidebar
