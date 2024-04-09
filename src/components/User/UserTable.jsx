import { useEffect, useState } from 'react';
import { useFirebase } from "../../providers/FirebaseContext"
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styles from "./UserTable.module.css"
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState({ show: false, message: '' });
  const firebase = useFirebase();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await firebase.getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [firebase]);

  const handleDelete = async (userId) => {
    await firebase.deleteUser(userId);
    setFeedback({ show: true, message: 'User successfully deleted!' });
    setTimeout(() => setFeedback({ show: false, message: '' }), 3000);
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  return (
    <>

      {feedback.show && (
        <Alert dismissible variant="success" className="animate">
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
      <Link to="/add-user">
        <Button variant="success" style={{ height: "50px", width: "50px", borderRadius: "25px", position: 'fixed', bottom: '50px', right: '50px' }}>
          <i className="bi bi-plus-lg"></i>
        </Button>
      </Link>
    </>
  );
};

export default UserTable;
