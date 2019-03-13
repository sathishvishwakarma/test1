import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";

class Message extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            users:[{name:'sathish'},{name:'kumar'},{name:'sandeep'}],
            selfContent:[{name:'Me',message:'@gloria How '},{name:'Gloria Rogers',message:'Hello how is all going on ??'},{name:'Me',message:'Hello how is all going on ??'}],
            activeUser:''
        };
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    render() {
        let iconName = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Alex_de_Minaur_%2842785492191%29_%28cropped%29.jpg/440px-Alex_de_Minaur_%2842785492191%29_%28cropped%29.jpg';
        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <p className="right-top-top"><b>Design Team</b></p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="right-top-middle">
                            {this.state.selfContent.map((menu,index) => {
                                return (
                                    <p>
                                        <Row>
                                            <Col lg={4}>
                                                <img src={iconName} className="image-icon" />
                                            </Col>
                                            <Col lg={8}>
                                                <Row>
                                                    <Col lg={10}><b>{menu.name}</b></Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={10}>{menu.message}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </p>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <input type="text" placeholder=" Type a message..." className="right-down-top"/>
                        <span className="right-down-bottom"></span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Message;