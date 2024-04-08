import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Header from "../components/Navigation/Header"
const Root = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Root