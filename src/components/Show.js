import React from 'react'
import Card from 'react-bootstrap/Card'
import './Show.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
class Show extends React.Component {

    state = {
        show: false
    }

    handleClose = () => this.setState({show: false})
    handleShow = () => this.setState({show: true})


    render = () =>  {
        const item = this.props.item;
        console.log(item);
        return (
            <div className="col-4">
                <Card onClick={this.handleShow}>
                    <Card.Img variant="top" src={`${item.images.show}`} alt= {`${item.title}`}/>
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                </Card>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{item.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={`${item.images.show}`} alt= {`${item.title}`}/>
                        <p>{item.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                        
            </div>
           
        );
    }
}

export default Show
