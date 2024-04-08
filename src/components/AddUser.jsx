import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import firebaseInstance from '../services/firebase';
import User from '../models/User';


function AddUser() {
  // State for user fields
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddUser = async () => {
    const newUser = new User(null, name, surname, email, phoneNumber, []);
    const userData = { ...newUser };

    try {
      const userId = await firebaseInstance.addUser(userData);
      console.log(`User added with ID: ${userId}`);

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
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleAddUser}>Add User</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddUser;
