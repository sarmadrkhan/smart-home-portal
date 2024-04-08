import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Root, Home, NotFound } from "./pages";
import UnderConstruction from "./components/UnderConstruction";
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";
function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Routes>
          <Route path='/*' element={<Main />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/path2" element={<UnderConstruction />} />
          <Route path="/path3" element={<UnderConstruction />} />
          <Route path="/path4" element={<UnderConstruction />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}