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
            friendId:'',
            userId:localStorage.getItem('userId'),
        };

        this.selectedFriend = this.selectedFriend.bind(this);
    }

    selectedFriend(friendId){
        this.setState({friendId:friendId});
    }

    render() {
        return (
            <div className="dashboard-main-div">
                <title>Chatting Application</title>
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col lg={3}>
                                <UserList userId={this.props.userId} friendId={this.state.friendId} selectedFriend={this.selectedFriend} />
                            </Col>
                            <Col lg={9}>
                                <Message userId={this.state.userId} friendId={this.state.friendId} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default Dashboard;