import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";
import axios from 'axios';
import Pusher from 'pusher-js';

class Message extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            chat:[],
            chatLists:[],
            activeFriend:'',
            activeFriendEmail:'',
            activeFriendImg:'',
            friendId:props.friendId,
            userId:props.userId
        };
    }

    componentWillReceiveProps(props) {
        this.setState({userID:props.userID,friendId:props.friendId});
        this.getFriendInfo(props.friendId);
        this.getChatList(props.userId,props.friendId);
        const pusher = new Pusher('5ce01ba62feee7d08f63', {
            cluster: 'ap2',
            encrypted: true
        });
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            this.setState({ chats: [...this.state.chats, data], test: '' });
        });
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    getFriendInfo(friendId) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
        return axios.get('http://dev.testapi.com/api/'+friendId).then((response) => {
            if(response && response.data) {
                this.setState({activeFriend:response.data.name,activeFriendEmail:response.data.email,activeFriendImg:response.data.profile_img});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    getChatList(userId,friendId) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
        return axios.post('http://dev.testapi.com/api/getMessage/'+userId+'/'+friendId).then((response) => {
            if(response && response.data) {
                this.setState({chatLists:response.data});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    handleTextChange(e) {
        if (e.keyCode === 13) {
            const payload = {
                user_id: this.state.userId,
                friend_id: this.state.friendId,
                chat: this.state.text
            };
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
            axios.post('http://dev.testapi.com/api/chat/sendChat', payload).then((response) => {
                if(response) {
                    this.getChatList(this.state.userId,this.state.friendId);
                    this.setState({text:''});
                    return response;
                }
            }).catch((error) => {
                console.log('errors of post data',error);
            });
        } else {
            this.setState({ text: e.target.value });
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <p className="right-top-top"><center><b>{this.state.activeFriend}</b></center></p>
                    </Col>
                </Row>
                <Row className="right-top-middle">
                    <Col lg={12}>
                        {this.state.chatLists.map((menu,index) => {
                            let name = (this.state.friendId !== menu.user.id) ? 'Me' : menu.user.name;
                            let profileImage = (this.state.friendId !== menu.user.id) ? menu.user.profile_img : this.state.activeFriendImg;
                            return (
                                <div className="right-top-middle-msg-content">
                                    <p>
                                        <Row key={index}>
                                            <Col lg={4}>
                                                <img src={profileImage} className="image-icon" />
                                            </Col>
                                            <Col lg={8}>
                                                <Row>
                                                    <Col lg={10}><b>{name}</b></Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={10}>{menu.chat}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </p>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <input
                            type="text"
                            value={this.state.text}
                            placeholder=" Type a message..."
                            className="right-down-top"
                            onChange={this.handleTextChange}
                            onKeyDown={this.handleTextChange}
                        />
                        <span className="right-down-bottom"></span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Message;