import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/meeting" header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/meeting" name="Meetings" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createMeeting"
            positive
            content="Create Meeting"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
