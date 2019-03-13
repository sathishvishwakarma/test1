import React from 'react';
import './style.scss';
import { Container, Row, Col } from 'reactstrap';
import UserList from "../UserList";
import Message from "../Message";
//import Websocket from 'react-websocket';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag:'Login',
            count: 90,
            activeUser:'Zack Davey',
            activeMessage:'on leave from 10-15 Aug'
        };
    }

    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
    }

    // getDefault(){
    //     return {/*<h1>Welcome to Chatting Application</h1>*/}
    //     {/*<div className="login-form">*/}
    //     {/*<label>*/}
    //     {/*NAME <span className="req">* </span>*/}
    //     {/*</label>*/}
    //     {/*<input type="text" required autoComplete="off"/>*/}
    //     {/*</div>*/}
    //     {/*<button>Enter</button>*/}
    //     {/*<Websocket url='ws://localhost:3000/'*/}
    //     {/*onMessage={this.handleData.bind(this)} reconnect={false}/>*/};
    // }

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

export default Login;