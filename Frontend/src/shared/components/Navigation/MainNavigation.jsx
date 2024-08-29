import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/BackDrop";
import { useState } from "react";

export default function MainNavigation() {
    const [drawerIsOpen,setDrawerIsOpen]=useState(false);
    function openDrawer(){
        setDrawerIsOpen(true);
    }
    function closeDrawer(){
        setDrawerIsOpen(false);
    }
  return (
    <>
    {drawerIsOpen && <Backdrop onClick={closeDrawer}/> }
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
