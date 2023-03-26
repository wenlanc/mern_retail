import React from 'react'
import { Navbar, Dropdown, Nav, Form, Card, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'

//image
import logo from '../../../../assets/images/logo.png'
import user1 from '../../../../assets/images/user/1.jpg'
import user2 from '../../../../assets/images/user/02.jpg'
import user3 from '../../../../assets/images/user/03.jpg'
import user4 from '../../../../assets/images/user/04.jpg'
import user5 from '../../../../assets/images/user/05.jpg'
import Button from '@restart/ui/esm/Button'

import { useTranslation } from 'react-i18next';

const Header = () => {
    
    const { t } = useTranslation();

    return (
        <>
            <div className="iq-top-navbar">
                <div className="iq-navbar-custom">
                    <Navbar expand="lg" variant="light" className="p-0">
                        <div className="iq-navbar-logo d-flex justify-content-between">
                            <Link to="/">
                                <Image src={logo} className="img-fluid" alt=""/>
                                <span>Affordable Nutrients</span>
                            </Link>
                        </div>
                        <Navbar.Toggle as="button">
                            <i className="ri-menu-3-line"></i>
                        </Navbar.Toggle>
                        <Navbar.Collapse>
                            <Nav as="ul" className="ms-auto navbar-list">
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as={Link} to="/store" className="d-flex align-items-center" variant="search-toggle">
                                        <i className="ri-home-8-line"></i>
                                        {t('home')}
                                    </Dropdown.Toggle>
                                </Dropdown>
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as={Link} to="/contact" className="d-flex align-items-center" variant="search-toggle">
                                        <i class="ri-mail-send-line"></i>
                                        {t('contact')}
                                    </Dropdown.Toggle>
                                </Dropdown>
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as={Link} to="/about" className="d-flex align-items-center" variant="search-toggle">
                                    <i class="ri-file-info-line"></i>
                                    {t('about')}
                                    </Dropdown.Toggle>
                                </Dropdown>
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as={Link} to="/wholesale_apply" className="d-flex align-items-center" variant="search-toggle">
                                    <i class="ri-login-circle-line"></i>
                                    {t('wholesale_login')}
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        </>
    )
}

export default Header
