import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Root, Home } from "./pages";
import UnderConstruction from "./components/UnderConstruction";
import UserTable from "./components/User/UserTable";
import HomeTable from "./components/Home/HomeTable";
import RoomTable from "./components/Room/RoomTable";
import HomeObjectTable from "./components/HomeObject/HomeObjectTable";
import AddSmartHome from "./components/Forms/AddSmartHome";

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
          <Route path="/add-smarthome" element={<AddSmartHome />} />
          <Route path="/homes" element={<HomeTable />} />
          <Route path="/rooms" element={<RoomTable />} />
          <Route path="/home-objects" element={<HomeObjectTable />} />
        </Route>
        <Route path='*' element={<UnderConstruction />} />
      </Routes>
    </>
  );
}