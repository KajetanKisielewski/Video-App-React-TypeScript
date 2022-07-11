import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

import VideoContext from '../../context/VideoContext';
import { stopRedirect } from '../../helpers/auxiliaryFunctions';

import './navBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const { setShowFavorite, setCurrentPage } = React.useContext(VideoContext);

    const toggleNav = () => setIsOpen(!isOpen);

    const showFavoriteVideos = (e) => {
        stopRedirect(e);
        setShowFavorite(true);
        setCurrentPage(1);
    };

    const showAllVideos = (e) => {
        stopRedirect(e);
        setShowFavorite(false);
        setCurrentPage(1);
    };

    return (
        <Navbar className="nav" color="dark" dark expand="md" sticky="top">
            <NavbarBrand href="/" onClick={stopRedirect}>
                Video App
            </NavbarBrand>
            <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            className="nav__link nav__link--all"
                            href="/"
                            onClick={showAllVideos}
                        >
                            All Videos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav__link nav__link--favourite"
                            href="/"
                            onClick={showFavoriteVideos}
                        >
                            Favorites
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavBar;
