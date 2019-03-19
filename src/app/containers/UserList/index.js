import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";
import axios from 'axios';
import Message from "../Message";

class UserList extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            friends:[],
            activeUser:'',
            activeUserEmail:'',
            activeUserImage:'',
            friendId:'',
            userdId:'',
        };

    }

    componentWillReceiveProps(props){
        this.getFriendsLists(props);
        this.getUserInfo(props)
    }

    selectedFriend(friendId,userId) {
        this.props.selectedFriend(friendId,userId);
    }

    getLastChatDetails(friendId,userId,index) {
        return axios.post('http://dev.testapi.com/api/getLastMessage/'+userId+'/'+friendId).then((response) => {
            if(response && response.data) {
                this.setState({ [`lastChat${index}`] :response.data.chat});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    getFriendsLists(props) {
        return axios.get('http://dev.testapi.com/api/friends/'+props.userId).then((response) => {
            if(response && response.data) {
                this.setState({friends:response.data});
            }
        }).catch((error) => {
            console.log('errors are friends list', error);
        });
    }

    getUserInfo(props) {
        return axios.get('http://dev.testapi.com/api/'+props.userId).then((response) => {
            if(response && response.data) {
                this.setState({activeUser:response.data.name,activeUserEmail:response.data.email,activeUserImage:response.data.profile_img});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="left-middle-top left-middle-mid">
                        <Col lg={12}>
                            <Row ><Col lg={12}>Bro4u Chat Application</Col></Row>
                            <Row>
                                <Col lg={12}>
                                    <Row className="left-top">
                                        <Col lg={4}>
                                            <img src={this.state.activeUserImage} className="image-icon" />
                                        </Col>
                                        <Col lg={8}>
                                            <Row>
                                                <Col lg={12}><b>{this.state.activeUser}</b></Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}>{this.state.activeUserEmail}</Col>
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
                            {this.state.friends.map((menu,index) => {
                                this.getLastChatDetails(menu.id,menu.pivot.friend_id,index);
                                return (
                                        <Row className="left-middle-mid" >
                                            <Col lg={12}>
                                                <a href="javascript:void(0)" onClick={this.selectedFriend.bind(this,menu.id,menu.pivot.friend_id)}>
                                                    <Row className="left-middle">
                                                        <Col lg={4}>
                                                            <img src={menu.profile_img} className="image-icon" />
                                                        </Col>
                                                        <Col lg={8}>
                                                            <Row>
                                                                <Col lg={12}><b>{menu.name}</b></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={12}>{(this.state[`lastChat${index}`]) ? this.state[`lastChat${index}`] : 'No Messages'}</Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </a>
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