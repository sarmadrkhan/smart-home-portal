import { useEffect, useState } from 'react';
import { useFirebase } from "../providers/FirebaseContext"
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await firebase.getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [firebase]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/add-user">
        <Button variant="primary" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <i className="bi bi-plus-lg"></i>
        </Button>
      </Link>
    </>
  );
};

export default UserTable;
