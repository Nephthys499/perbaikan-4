import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/navbar.css";
import sd from "../assets/logo562.png";

function BasicExample() {
  return (
    <Navbar className="ms-auto" expand="lg" bg="transparent" data-bs-theme="light" fixed="top">
      <Container className="pt-2 m-md-auto">
        <Navbar.Brand className="namaSekolah text-dark d-flex justify-content-center align-items-center fw-semibold    font-monospace fw-lighter" href="/kelas">
          <img className="navbarlogo" width={45} height={35} src={sd} alt="" /> &nbsp;MI Ya BAKII
        </Navbar.Brand>
        <Navbar.Toggle className="tugel" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="coba ms-auto ">
            <div className="navNav-link">
              <Nav.Link className="fw-bold" href="/kelas">
                Halaman utama
              </Nav.Link>
            </div>
            {/* <Nav.Link href="">Balik ke atas</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
