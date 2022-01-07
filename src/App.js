import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
  
      <Navbar bg="light" varinat="light">
        <Container>
          <Navbar.Brand href='home' style={{ color: "black" }}>
            <Image
              alt=""
              src="/favicon.ico"
              width="25"
              height="25"
              className="d-inline-block align-top"
            />{' '}{' '}
            House Marketplace
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link style={{ color: "black" }} href="#"><i className="far fa-compass"></i> Explore</Nav.Link>
            <Nav.Link style={{ color: "black" }} href="#"><i className="fas fa-tag"></i> Offers</Nav.Link>
            <Nav.Link style={{ color: "black" }} href="#"><i className="fas fa-user-circle"></i> Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
