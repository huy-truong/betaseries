import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

class NavComponent extends React.Component {
    render = () =>  {
        
        var loggedIn = '';

        if (!this.props.appProps.isAuthenticated){
            loggedIn = <Nav.Link onClick={this.props.handlers.handleAuthen}>Login</Nav.Link>;
        }else{
            loggedIn = 
            <>
            <Nav.Link href="/series">Series</Nav.Link> 
            <Nav.Link onClick={this.props.handlers.handleLogout}>Logout</Nav.Link>
            </>;
        }
            

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    {loggedIn}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavComponent