import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

import VideoContext from "../../context/VideoContext";
import { stopRedirect } from "../../helpers/auxiliaryFunctions";

import "./navBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const context = React.useContext(VideoContext);

  if (!context) return null;

  const { setShowFavorite, setCurrentPage } = context;

  const toggleNav = (): void => setIsOpen(!isOpen);

  const showFavoriteVideos = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    stopRedirect(event);
    setShowFavorite(true);
    setCurrentPage(1);
  };

  const showAllVideos = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    stopRedirect(event);
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
            <NavLink className="nav__link nav__link--all" href="/" onClick={showAllVideos}>
              All Videos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav__link nav__link--favourite" href="/" onClick={showFavoriteVideos}>
              Favorites
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
