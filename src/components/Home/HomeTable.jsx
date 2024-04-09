import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useFirebase } from "../../providers/FirebaseContext"

const HomeTable = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ show: false, message: '' });

  const firebase = useFirebase();

  useEffect(() => {
    const fetchHomesWithOwners = async () => {
      try {
        const fetchedHomes = await firebase.getHomes();
        const homesWithOwnerPromises = fetchedHomes.map(async home => {
          try {
            const owner = await firebase.getHomeOwner(home.id);
            return { ...home, owner: owner ? `${owner.name} ${owner.surname}` : 'Unknown' };
          } catch (error) {
            console.error('Failed to fetch owner for home:', home.id, error);
            return { ...home, owner: 'Error fetching owner' };
          }
        });

        const homesWithOwner = await Promise.all(homesWithOwnerPromises);
        setHomes(homesWithOwner);
      } catch (error) {
        setError('Failed to fetch homes or owners');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomesWithOwners();
  }, [firebase]);

  const handleDelete = async (homeId) => {
    try {
      await firebase.deleteHome(homeId);
      const updatedHomes = homes.filter(home => home.id !== homeId);
      setHomes(updatedHomes);
      setFeedback({ show: true, message: 'Home successfully deleted!' });
      setTimeout(() => setFeedback({ show: false, message: '' }), 3000);
    } catch (err) {
      setError('Failed to delete home');
      console.error(err);
    }
  };

  const handleEdit = (homeId) => {
    console.log(`Edit home with ID: ${homeId}`);
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
            <th>City</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((home) => (
            <tr key={home.id}>
              <td>{home.name}</td>
              <td>{home.city}</td>
              <td>{home.description}</td>
              <td>{home.owner}</td>
              <td className="d-flex justify-content-center">
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(home.id)} className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(home.id)}>
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

export default HomeTable;
