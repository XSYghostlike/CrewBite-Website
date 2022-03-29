import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {Auth} from "aws-amplify";

function Navigation(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        &nbsp; Crewbite Mockup
      </Navbar.Brand>
      { props.user ? (
          <>
            <Navbar.Text>{props.user.attributes['email']}</Navbar.Text>
            <Button onClick={() => Auth.signOut()}>
                Sign Out
            </Button>
          </>
      ) : <Navbar.Text>Not Signed In</Navbar.Text>}
    </Navbar>
  );
}

export default Navigation;
