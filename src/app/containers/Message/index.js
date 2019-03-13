import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";

class Message extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            users:[{name:'sathish'},{name:'kumar'},{name:'sandeep'}],
            activeUser:''
        };
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={12}>Design Team</Col>
                </Row>
                <Row>
                    <Col lg={12}>sathish</Col>
                </Row>
                <Row>
                    <Col lg={12}>kumar</Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <input type="text" placeholder=" Type a message..."/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Message;