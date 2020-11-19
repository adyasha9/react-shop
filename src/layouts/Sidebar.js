import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import firebase from './../config/firebase'
import { AuthContext } from './../contexts/AuthContext'
import './../styles/variables.scss';
import { Collapse,Button } from 'reactstrap';

const selected = {
    backgroundColor:'#4f4f4f'
}

const Sidebar = () => {
    const [current, setCurrent] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    
  const toggle = () => setIsOpen(!isOpen);
    return <div>
    <Button color="dark" onClick={toggle} style={{  }}>&#9776;</Button>
    <Fragment>

    <Collapse isOpen={isOpen}>
            <div className="MainSidebar">
            <AuthContext.Consumer>
                {(value) => {           
                    if ( value.state.user === null || Object.keys(value.state.user).length === 0 ) {
                        return  <div className="user-profile">
                            <div className="user-initial">G</div>
                            <div className="user-name">Guest</div>
                        </div>
                    } else {
                        return  (
                        <Fragment> 
                            <div className="user-profile">
                                <div className="user-initial">{value.state.user.user.displayName.slice(0,1)}</div>
                                <div className="user-name">{value.state.user.user.displayName}</div>
                            </div>
                            <ul>
                                <li><Link style={ current === 1 ? selected : null}  onClick={()=> setCurrent(1)} to="/"><ion-icon name="pricetag-outline" style={{fontSize:18}}></ion-icon>Products</Link></li>
                                <li><Link style={ current === 2 ? selected : null}  onClick={()=> setCurrent(2)} to="/user/order"><ion-icon name="cart-outline" style={{fontSize:18}}></ion-icon> List Of Orders</Link></li>
                                <li><Link style={ current === 3 ? selected : null}  onClick={()=> setCurrent(3)} to="/user/cart"><ion-icon name="cart-outline" style={{fontSize:18}}></ion-icon> Cart</Link></li>
      
      
                            </ul>
                        </Fragment>)
                    }
                }}
            </AuthContext.Consumer>
                
            </div>
            </Collapse>
            </Fragment>
            </div>
   
}

export default withRouter(Sidebar)