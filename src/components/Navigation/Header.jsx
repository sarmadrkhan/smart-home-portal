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
          <Link to="/users">Registered Users</Link>
          <Link to="/path2" >Reviews</Link>
          <Link to="/path3">Contact Us</Link>
          <Link to="/path4">Store</Link>
        </Nav>
        <Button variant='dark' onClick={donotClickHandler}>DO NOT CLICK</Button>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>💲300 transferred 💸 to Sarmad Raees Khan's account. Should've followed the clear instructions. HeHeHe 😈</Modal.Body>
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
