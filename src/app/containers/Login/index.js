import React from 'react';
import './style.scss';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag:'Login',
        };
    }

    render() {
        return (
            <div>
                <title>Chatting Application</title>

                <h1>Welcome to Chatting Application</h1>
                    <div className="login-form">
                        <label>
                            NAME <span className="req">* </span>
                        </label>
                        <input type="text" required autoComplete="off"/>
                    </div>
                <button>Enter</button>
            </div>
        );
    }

}

export default Login;