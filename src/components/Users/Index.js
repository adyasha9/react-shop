import React, { Component, Fragment } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import List from './List'
import Add from './Add'
import { db } from '../../config/firebase'
import Hero from './../Hero/Index'
import Alert from '../Alert/Index'
import  { Redirect } from 'react-router-dom'
import { AuthContext } from './../../contexts/AuthContext'

const container = {
    padding:30,
    paddingTop:0
}

export default class Index extends Component {
    state = {
        users: [],
        alertMessage: null,
        showAlert: false,
        alertType: 'success'
    }
    alertTimeout = null

    componentDidMount() {
        db.collection("user")
            .onSnapshot(snapshot => {
                const users = []
                snapshot.forEach(doc => {
                    const obj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    users.push(obj)
                })
                this.setState({ users })
            });
        this.setState({ isLoading: true })
        db.collection("user")
            .onSnapshot(snapshot => {
                const userList = []
                snapshot.forEach(doc => {
                    const dataObj = {
                        id: doc.id,
                        name: doc.data()
                    }
                    userList.push(dataObj)

                })
                this.setState({
                 userList,
                    isLoading: false
                })
            })
    }
    handleAddNewUser = (newUser, userImage) => {
        if (newUser.length > 3 && userImage.length) {
            db.collection("user").add({
                name: newUser,
                url:userImage
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            const alertObj = {
                type: 'success',
                message: 'New user Added Successfuly!'
            }
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert: false
                }, () => {
                    this.alertTimeout = setTimeout(() => {
                        this.handleShowAlert(alertObj)
                    }, 250)
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        } else {
            const alertObj = {
                type: 'failed',
                message: 'Character must be greater than 3 and It must have a user image'
            }
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout)
                this.setState({
                    showAlert: false
                }, () => {
                    this.alertTimeout = setTimeout(() => {
                        this.handleShowAlert(alertObj)
                    }, 250)
                })
            } else {
                this.handleShowAlert(alertObj)
            }
        }
    }
    handleShowAlert = ({ message, type }) => {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertType: type
        }, () => {
            this.alertTimeout = setTimeout(() => {
                this.setState({
                    showAlert: false,
                })
            }, 3000)
        })
    }
    handleRemoveUser = (id) => {
        db.collection("user").doc(id).delete().then(function () {
            console.log('deleted')
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
        const alertObj = {
            type: 'success',
            message: 'user Deleted Successfuly!'
        }
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout)
            this.setState({
                showAlert: false
            }, () => {
                this.alertTimeout = setTimeout(() => {
                    this.handleShowAlert(alertObj)
                }, 250)
            })
        } else {
            this.handleShowAlert(alertObj)
        }
    }

    render() {

        const isLoading = this.state.isLoading ?
            (<div className="loading">Loading users...</div>) :
            (<List
             userList={this.state.users}
                handleRemoveUser={this.handleRemoveUser}
            />
            )

        return (
            <Fragment>
                <AuthContext.Consumer>
                {(value) => {
                   if(Object.keys(value.state.user).length === 0 || value.state.user === null) {
                        return <Redirect to='/'  />
                   }
                }}
            </AuthContext.Consumer>
                <Hero title="users" />
                <Container style={container}>
                    <Alert
                        showAlert={this.state.showAlert}
                        type={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                     <Card>
                        <Card.Header>
                            <h5>List of users</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup as="ul">
                                {isLoading}
                            </ListGroup>
                            <Add
                                handleAddNewUser={this.handleAddNewUser}
                            />
                        </Card.Body>
                    </Card>
                </Container>
            </Fragment>
        )
    }
}
