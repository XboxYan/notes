import React, { PureComponent } from 'react';
import Back from '../components/back';
import fetchData from '../util/Fetch';

export default class extends PureComponent {

    state = {
        username:window.localStorage.loginInfo ? JSON.parse(window.localStorage.loginInfo).username:'',
        password:''
    }

    onSubmit = async (ev) => {
        ev.preventDefault();
        const { username,password } = this.state;
        const loginInfo = await fetchData(`/api/login`,{
            method:'POST',
            body:JSON.stringify({username,password})
        });
        if(loginInfo.success){
            window.localStorage.loginInfo = JSON.stringify(loginInfo.info);
            this.props.login(loginInfo.info);
        }
    }

    onChange = (name) => (ev) => {
        this.setState({[name]:ev.target.value})
    }

    render() {
        const { username,password } = this.state;
        return (
            <div className="app app-center">
                <Back/>
                <form className="login-con sildeUpMin" onSubmit={this.onSubmit}>
                    <h3 className="login-title">LOGIN</h3>
                    <label className="login-label">USER</label>
                    <input className="login-input" value={username} onChange={this.onChange('username')} />
                    <label className="login-label">PASSWORD</label>
                    <input className="login-input" type="password" value={password} onChange={this.onChange('password')} />
                    <button type="submit" className="login-btn" onClick={this.onSubmit}>LOGIN</button>
                </form>
            </div>
        );
    }
}
