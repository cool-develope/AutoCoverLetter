import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  Label,
  Input,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  FormGroup,
  NavbarToggler
} from "reactstrap";
import { isLogin, getUser } from "../utils/auth";

const NavHeader = (props) => {
  const { isOpen: isModalOpen, setCreate } = props;
  const [logged, setLogged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const username = getUser()["name"];

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLogged(isLogin());
  });

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Cool CoverLetters</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mx-2">
              {
                logged ?
                  <Button
                    className="btn btn-info"
                    onClick={() => {
                      setCreate(!isModalOpen);
                    }}
                  >
                    Create Letter
                  </Button> :
                  <Button className="btn btn-secondary" disabled>Create Letter</Button>
              }
            </NavItem>
            <NavItem className="mx-2">
              {logged && <FormGroup className="my-2" check>
                <Label check>
                  <Input type="checkbox" onChange={e => console.log(e.target.value)} />{' '}My Letters
                </Label>
              </FormGroup>}
            </NavItem>
            <NavItem className="mx-2">
              <Input type="text" name="search" id="search" size="35" placeholder="Search Key" onClick={e => console.log(e.target.value)} />
            </NavItem>
          </Nav>
          {
            logged
              ?
              <a href="/auth/logout">{ username } - Logout</a>
              :
              <a href="/auth/login/">Login</a>
          }
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavHeader;
