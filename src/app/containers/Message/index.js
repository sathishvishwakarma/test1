import React from "react";
import './style.scss';
import {Col, Container, Row} from "reactstrap";
import axios from 'axios';
import Pusher from 'pusher-js';

class Message extends React.PureComponent
{
    constructor(props){
        console.log('coming to message feidlsjdjsbkabjhsvdb',props);
        super(props);
        this.state = {
            chat:[],
            chatLists:[],
            activeFriend:'',
            activeFriendEmail:'',
            activeFriendImg:'',
            friendId:2,
            userId:1
        };
    }

    componentWillMount(){

    }

    getFriendInfo(props) {
        return axios.get('http://dev.testapi.com/api/'+props.friendId).then((response) => {
            if(response && response.data) {
                this.setState({activeFriend:response.data.name,activeFriendEmail:response.data.email,activeFriendImg:response.data.profile_img});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    getChatList(props) {
        return axios.post('http://dev.testapi.com/api/getMessage/'+props.userId+'/'+props.friendId).then((response) => {
            if(response && response.data) {
                this.setState({chatLists:response.data[0].chats});
            }
        }).catch((error) => {
            console.log('errors are user info', error);
        });
    }

    componentWillReceiveProps(props) {
        this.getFriendInfo(props);
        this.getChatList(props);
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
    // componentDidMount(){
    //     this.getFriendInfo();
    //     this.getChatList();
    //
    //     const pusher = new Pusher('5ce01ba62feee7d08f63', {
    //         cluster: 'ap2',
    //         encrypted: true
    //     });
    //     const channel = pusher.subscribe('chat');
    //     channel.bind('message', data => {
    //         this.setState({ chats: [...this.state.chats, data], test: '' });
    //     });
    //     this.handleTextChange = this.handleTextChange.bind(this);
    // }

    handleTextChange(e) {
        if (e.keyCode === 13) {
            const payload = {
                user_id: this.state.userId,
                friend_id: this.state.friendId,
                chat: this.state.chats
            };
            axios.post(process.env.API_URL+'/api/chat/sendChat', payload).then((response) => {
                if(response) {
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
                <Row>
                    <Col lg={12}>
                        <div className="right-top-middle">
                            {this.state.chatLists.map((menu,index) => {
                                return (
                                    <div>
                                        <p>
                                            <Row>
                                                <Col lg={4}>
                                                    <img src={this.state.activeFriendImg} className="image-icon" />
                                                </Col>
                                                <Col lg={8}>
                                                    <Row>
                                                        <Col lg={10}><b>{this.state.activeFriend}</b></Col>
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
                        </div>
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