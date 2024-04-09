import { useEffect, useState } from 'react';
import { useFirebase } from "../../providers/FirebaseContext";
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import styles from "./UserTable.module.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ show: false, message: '' });

  const firebase = useFirebase();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await firebase.getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [firebase]);

  const handleDelete = async (userId) => {
    try {
      await firebase.deleteUser(userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setFeedback({ show: true, message: 'User successfully deleted!' });
      setTimeout(() => setFeedback({ show: false, message: '' }), 3000);
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
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
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td className={styles.actions}>
                <Button variant="outline-primary" size="sm" onClick={() => handleEdit(user.id)} className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>
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

export default UserTable;
