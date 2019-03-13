import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";

class UserList extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            users:[{name:'Mark Harris',message:'Can you send me the file ?'},
                   {name:'Design Team',message:'Sam Hilton - sent a image'},
                   {name:'Betty M',message:'Good Job..!'},
                   {name:'Isabella Barry',message:'Ok see you soon..!'},
                   {name:'James Skinner',message:'Where are we on the project plans ?'},
                   {name:'Irene Bailey',message:'No problem i got this'}]
        };
    }

    render() {
        let iconName = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Alex_de_Minaur_%2842785492191%29_%28cropped%29.jpg/440px-Alex_de_Minaur_%2842785492191%29_%28cropped%29.jpg';
        return (
            <div>
                <Container>
                    <Row className="left-middle-top left-middle-mid">
                        <Col lg={12}>
                            <Row ><Col lg={12}>Flock Designers </Col></Row>
                            <Row>
                                <Col lg={12}>
                                    <Row className="left-top">
                                        <Col lg={4}>
                                            <img src={iconName} className="image-icon" />
                                        </Col>
                                        <Col lg={8}>
                                            <Row>
                                                <Col lg={12}><b>{this.props.activeUser}</b></Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}>{this.props.activeMessage}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <input className="left-top-div" type="text" placeholder="  Start Conversation"/>
                    </Row>
                    <Row className="left-middle-top">
                        <Col lg={12}>
                            {this.state.users.map((menu,index) => {
                                return (
                                    <Row className="left-middle-mid">
                                        <Col lg={12}>
                                            <Row className="left-middle">
                                                <Col lg={4}>
                                                    <img src={iconName} className="image-icon" />
                                                </Col>
                                                <Col lg={8}>
                                                    <Row>
                                                        <Col lg={12}><b>{menu.name}</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={12}>{menu.message}</Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
             </div>
        );
    }
}

export default UserList;