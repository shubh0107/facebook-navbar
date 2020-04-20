import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";

export default function App() {
  return (
    <Navbar>
      <NavItem icon={<FontAwesomeIcon icon={["fas", "plus"]} size="xs" />} />
      <NavItem icon={<FontAwesomeIcon icon={["fas", "bell"]} size="xs" />} />
      <NavItem
        icon={<FontAwesomeIcon icon={["fas", "angle-down"]} size="xs" />}
      >
        <Dropdown />
      </NavItem>
    </Navbar>
  );
}

const Navbar = props => (
  <nav className="navbar">
    <ul className="navbar-nav">{props.children}</ul>
  </nav>
);

const NavItem = props => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a
        href="javascript:void(0)"
        className="icon-button"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};

const Dropdown = props => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    calcHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropdownItem = props => {
    return (
      <a
        href="javascript:void(0)"
        className="dropdown-item"
        onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}
      >
        <span className="icon-left">
          <FontAwesomeIcon icon={["fas", props.leftIcon]} size="md" />
        </span>
        {props.children}
        <span className="icon-right">
          <FontAwesomeIcon icon={["fas", props.rightIcon]} size="md" />
        </span>
      </a>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={300}
        onEnter={calcHeight}
        classNames="primary-menu"
      >
        <div className="menu">
          <DropdownItem leftIcon="user-circle">Profile</DropdownItem>
          <DropdownItem leftIcon="envelope">Messages</DropdownItem>
          <DropdownItem leftIcon="user-friends">Friends</DropdownItem>
          <DropdownItem
            leftIcon="cog"
            rightIcon="angle-right"
            gotoMenu="secondary"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "secondary"}
        unmountOnExit
        timeout={300}
        onEnter={calcHeight}
        classNames="secondary-menu"
      >
        <div className="menu">
          <DropdownItem leftIcon="angle-left" gotoMenu="main" />
          <DropdownItem leftIcon="envelope">Messages</DropdownItem>
          <DropdownItem leftIcon="user-friends">Friends</DropdownItem>
          <DropdownItem leftIcon="cog">Settings</DropdownItem>
          <DropdownItem leftIcon="user-circle">Profile</DropdownItem>
          <DropdownItem leftIcon="envelope">Messages</DropdownItem>
          <DropdownItem leftIcon="user-friends">Friends</DropdownItem>
          <DropdownItem leftIcon="cog">Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};
