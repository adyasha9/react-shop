import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'
import FileUploader from "react-firebase-file-uploader"
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'


export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            show:false,
            isUploading: false,
            progress: 0,
            imageURL: ""
        }
    }
    handleUpdateStateUser = e => {
        e.preventDefault()
        this.setState({
            user: e.target.value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.props.handleAddNewUser(this.state.user, this.state.imageURL)
        this.setState({
            user:''
        })
       
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow = () => {
        this.setState({
            show:true
        })
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ progress: 100, isUploading: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState({ imageURL: url }));
      };
    render() {
        return (
            <Fragment>
                <Button variant="primary" onClick={this.handleShow} style={ addButton }>
                <FontAwesomeIcon size="xs" icon={faPlus} /> New User
                </Button>
                <Modal 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} 
                    onHide={this.handleClose}>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <span style={{display:'block'}}>Select User Image: </span>
                        {this.state.imageURL && <img className="user-image" src={this.state.imageURL} />}
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            className="user-file-uploader"
                        />
                         {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                            <span style={{marginBottom:10,marginTop:10, display:'block'}}>Add user name: </span>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control placeholder="email id" name="user" value={ this.state.user } onChange={ this.handleUpdateStateUser } />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                <FontAwesomeIcon icon={faTimes}/> Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.handleClose}>
                            <FontAwesomeIcon icon={faSave}/> Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
        )
    }
}


const addButton = {
    marginTop:'10px',
    float:'right',
    backgroundColor:'#00807d',
    borderColor:'#00807d'
}

