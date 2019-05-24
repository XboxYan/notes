import React, { PureComponent } from 'react';
import { Link } from 'react-keeper';

export default class extends PureComponent {
    render() {
        const { userInfo,logout } = this.props;
        return (
            <div className="user-info">
                <span className="user-head">{userInfo.username[0]}</span>
                <span className="user-name">{userInfo.username}</span>
                <div className="user-more">
                    {
                        userInfo.isAdmin && <Link className="user-admin" to="/admin">进入后台</Link>
                    }
                    <a className="login-out" onClick={logout}>退出</a>
                </div>
            </div>
        )
    }
}