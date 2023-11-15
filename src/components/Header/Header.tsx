import{Container, Nav, Navbar} from "react-bootstrap";
import{useNavigate}from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const Header = () =>{
  //Utils
  const navigate = useNavigate();
  const isLoggedIn:boolean = useIsLoggedIn();

  //Handlers
  function onLogOut(){
    window.localStorage.removeItem('isLoggedIn');
    navigate('/');
  }

  //Render
    return (
        <><Navbar expand="lg" className="bg-body-tertiary">
        <Container>

          <Navbar.Brand onClick={()=>navigate('/')}>El Buen Sabor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={()=>navigate('/administración')}>Rubros</Nav.Link>
              {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar></>
    )
}

export default Header;