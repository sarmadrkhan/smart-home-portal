import { useState } from 'react';
import { Button, Nav, Navbar, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const donotClickHandler = () => {
    handleShow();
  };
  const titleClickHandler = () => {
    navigate("/");
  }
  return (
    <>
      <Navbar className={styles.navbar} expand="md">
        <Navbar.Brand onClick={titleClickHandler} className={styles.title}>
          Smart Home Portal
        </Navbar.Brand>
        <Nav className={`${styles.navlinks} d-none d-md-flex`}>
          <Link to="/users">Users</Link>
          <Link to="/homes" >Homes</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/home-objects">Objects</Link>
        </Nav>
        <Button variant='dark' onClick={donotClickHandler}>DO NOT CLICK</Button>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>A custom alert modal with a message</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
