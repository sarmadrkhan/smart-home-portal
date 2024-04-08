import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../providers/FirebaseContext';
import User from '../models/User';


function AddUser() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  // State for user fields
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddUser = async () => {
    const newUser = new User(null, name, surname, email, phoneNumber, []);
    const userData = { ...newUser };

    try {
      const userId = await firebase.addUser(userData);
      console.log(`User added with ID: ${userId}`);
      navigate("/users");
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Add User</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control required type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control required type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(parseInt(e.target.value))} />
            </Form.Group>

            <Button variant="primary" onClick={handleAddUser}>Add User</Button>
            &nbsp;
            <Button variant='danger' onClick={() => navigate("/users")}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddUser;
