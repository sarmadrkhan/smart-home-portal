import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import UserModel from "../../models/User"
import HomeModel from "../../models/Home"
import RoomModel from "../../models/Room"
import HomeObjectModel from "../../models/HomeObject"
import { useFirebase } from "../../providers/FirebaseContext"
import { useNavigate } from 'react-router-dom';

const AddSmartHome = () => {
  const [step, setStep] = useState(1);
  const [userFormData, setUserFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: ''
  });
  const [homeFormData, setHomeFormData] = useState({
    name: '',
    city: '',
    description: ''
  });
  const [roomFormData, setRoomFormData] = useState({
    name: ''
  });
  const [homeObjectFormData, setHomeObjectFormData] = useState({
    name: '',
    type: '',
    state: 0
  });
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleUserDataChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleHomeDataChange = (e) => {
    setHomeFormData({ ...homeFormData, [e.target.name]: e.target.value });
  };

  const handleRoomDataChange = (e) => {
    setRoomFormData({ ...roomFormData, [e.target.name]: e.target.value });
  };

  const handleHomeObjectDataChange = (e) => {
    const { name, value } = e.target;
    let newValue = name === 'state' ? parseInt(value, 10) : value;
    setHomeObjectFormData({ ...homeObjectFormData, [name]: newValue });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStateOptions = (type) => {
    if (type === 'light' || type === 'socket') {
      return (
        <>
          <option value="0">Off</option>
          <option value="1">On</option>
        </>
      );
    } else if (type === 'shutter') {
      return (
        <>
          <option value="0">Closed</option>
          <option value="1">Open</option>
          <option value="2">Stopped</option>
        </>
      );
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Add the home object
      const homeObjectToAdd = new HomeObjectModel(null, homeObjectFormData.name, homeObjectFormData.type, homeObjectFormData.state);
      const homeObjectId = await firebase.addHomeObject(homeObjectToAdd);

      // Step 2: Add the room
      const roomHomeObjectRefs = roomFormData.homeObjectRefs ? [...roomFormData.homeObjectRefs, homeObjectId] : [homeObjectId];
      const newRoom = new RoomModel(null, roomFormData.name, roomHomeObjectRefs);
      const roomId = await firebase.addRoom(newRoom);

      // Step 3: Add the home
      const homeRoomRefs = homeFormData.roomRefs ? [...homeFormData.roomRefs, roomId] : [roomId];
      const newHome = new HomeModel(null, homeFormData.name, homeFormData.description, homeFormData.city, homeRoomRefs);
      const homeId = await firebase.addHome(newHome);

      // Step 4: Add the user
      const userHomeRefs = userFormData.homeRefs ? [...userFormData.homeRefs, homeId] : [homeId];
      const newUser = new UserModel(null, userFormData.name, userFormData.surname, userFormData.email, userFormData.phoneNumber, userHomeRefs);
      await firebase.addUser(newUser);

      // Navigate to "/users" after successful creation
      navigate("/users");

    } catch (error) {
      console.error("Failed to create new entities:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userFormData.name}
                onChange={handleUserDataChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={userFormData.surname}
                onChange={handleUserDataChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userFormData.email}
                onChange={handleUserDataChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={userFormData.phoneNumber}
                onChange={handleUserDataChange}
                required
              />
            </Form.Group>
            <Button variant='danger' onClick={() => navigate("/")}>Cancel</Button>
            &nbsp;
            <Button onClick={nextStep} variant="success">Next</Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Home Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={homeFormData.name}
                onChange={handleHomeDataChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={homeFormData.city}
                onChange={handleHomeDataChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={homeFormData.description}
                onChange={handleHomeDataChange}
                required
              />
            </Form.Group>
            <Button onClick={prevStep}>Back</Button>
            &nbsp;
            <Button onClick={nextStep} variant="success">Next</Button>
          </div>
        )}
        {step === 3 && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={roomFormData.name}
                onChange={handleRoomDataChange}
                required
              />
            </Form.Group>
            <Button onClick={prevStep}>Back</Button>
            &nbsp;
            <Button onClick={nextStep} variant="success">Next</Button>
          </div>
        )}
        {step === 4 && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Home Object Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={homeObjectFormData.name}
                onChange={handleHomeObjectDataChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={homeObjectFormData.type}
                onChange={handleHomeObjectDataChange}
                required
              >
                <option value="">Select Type</option>
                <option value="light">Light</option>
                <option value="socket">Socket</option>
                <option value="shutter">Shutter</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Select
                name="state"
                value={homeObjectFormData.state.toString()}
                onChange={handleHomeObjectDataChange}
                required
              >
                {renderStateOptions(homeObjectFormData.type)}
              </Form.Select>
            </Form.Group>


            <Button variant="primary" onClick={prevStep}>Back</Button>
            &nbsp;
            <Button variant='warning' type="submit">Submit</Button>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default AddSmartHome;
