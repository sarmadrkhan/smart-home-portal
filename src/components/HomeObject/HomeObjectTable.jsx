import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useFirebase } from "../../providers/FirebaseContext";

const HomeObjectTable = () => {
  const [homeObjects, setHomeObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ show: false, message: '' });

  const firebase = useFirebase();

  const fetchHomeObjectsWithOwners = async () => {
    try {
      const fetchedHomeObjects = await firebase.getHomeObjects();
      const homeObjectsWithOwnerPromises = fetchedHomeObjects.map(async homeObject => {
        try {
          const owner = await firebase.getHomeObjectOwner(homeObject.id);
          return { ...homeObject, ownerRoomName: owner ? owner.name : 'Unknown' };
        } catch (error) {
          console.error('Failed to fetch owner for home object:', homeObject.id, error);
          return { ...homeObject, ownerRoomName: 'Error fetching owner' };
        }
      });

      const homeObjectsWithOwner = await Promise.all(homeObjectsWithOwnerPromises);
      setHomeObjects(homeObjectsWithOwner);
    } catch (error) {
      setError('Failed to fetch home objects or owners');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeObjectsWithOwners();
  }, []);

  const renderStateLabel = (type, state) => {
    if (type === 'socket' || type === 'light') {
      return state === 0 ? 'Off' : 'On';
    } else if (type === 'shutter') {
      switch (state) {
        case 0:
          return 'Closed';
        case 1:
          return 'Open';
        default:
          return 'Stopped';
      }
    }
    return state;
  };

  const handleDelete = async (homeObjectId) => {
    try {
      await firebase.deleteHomeObject(homeObjectId);
      const updatedHomeObjects = homeObjects.filter(homeObject => homeObject.id !== homeObjectId);
      setHomeObjects(updatedHomeObjects);
      setFeedback({ show: true, message: 'homeObject successfully deleted!' });
      setTimeout(() => setFeedback({ show: false, message: '' }), 3000);
    } catch (err) {
      setError('Failed to delete homeObject');
      console.error(err);
    }
  };

  const handleEdit = (homeObjectId) => {
    console.log(`Edit homeObject with ID: ${homeObjectId}`);
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      {feedback.show && (
        <Alert variant="success" dismissible onClose={() => setFeedback({ show: false, message: '' })}>
          {feedback.message}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Type</th>
            <th>Room Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homeObjects.map((homeObject) => (
            <tr key={homeObject.id}>
              <td>{homeObject.name}</td>
              <td>{renderStateLabel(homeObject.type, homeObject.state)}</td>
              <td>{homeObject.type}</td>
              <td>{homeObject.ownerRoomName}</td>
              <td className="d-flex justify-content-center">
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(homeObject.id)} className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(homeObject.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HomeObjectTable;
