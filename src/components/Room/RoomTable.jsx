import { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { useFirebase } from "../../providers/FirebaseContext";

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ show: false, message: '' });

  const firebase = useFirebase();

  useEffect(() => {
    const fetchRoomsWithOwners = async () => {
      try {
        const fetchedRooms = await firebase.getRooms();
        const roomsWithOwnerPromises = fetchedRooms.map(async room => {
          try {
            const owner = await firebase.getRoomOwner(room.id);
            return { ...room, owner: owner ? `${owner.name}` : 'Unknown' };
          } catch (error) {
            console.error('Failed to fetch owner for room:', room.id, error);
            return { ...room, owner: 'Error fetching owner' };
          }
        });

        const roomsWithOwner = await Promise.all(roomsWithOwnerPromises);
        setRooms(roomsWithOwner);
      } catch (error) {
        setError('Failed to fetch rooms or owners');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomsWithOwners();
  }, [firebase]);

  const handleDelete = async (roomId) => {
    try {
      await firebase.deleteRoom(roomId);
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      setRooms(updatedRooms);
      setFeedback({ show: true, message: 'Home successfully deleted!' });
      setTimeout(() => setFeedback({ show: false, message: '' }), 3000);
    } catch (err) {
      setError('Failed to delete room');
      console.error(err);
    }
  };

  const handleEdit = (roomId) => {
    console.log(`Edit room with ID: ${roomId}`);
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
            <th>Home ID</th>
            <th>Home Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.id}</td>
              <td>{room.owner}</td>
              <td className="d-flex justify-content-center">
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(room.id)} className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(room.id)}>
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

export default RoomTable;
