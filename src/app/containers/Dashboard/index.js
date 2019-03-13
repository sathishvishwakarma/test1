import React from 'react';
import './style.scss';
import { Container, Row, Col } from 'reactstrap';
import UserList from "../UserList";
import Message from "../Message";
//import Websocket from 'react-websocket';

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeUser:'Zack Davey',
            activeMessage:'on leave from 10-15 Aug'
        };
    }


    render() {
        return (
            <div>
                <title>Chatting Application</title>
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col lg={3}>
                                <UserList activeUser={this.state.activeUser} activeMessage={this.state.activeMessage}/>
                            </Col>
                            <Col lg={9}>
                                <Message activeUser={this.state.activeUser}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Dashboard;