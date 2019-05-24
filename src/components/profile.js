import React, { PureComponent } from 'react';

export default class extends PureComponent {
    render() {
        return (
            <div className="profile">
                <img onClick={this.props.onClick} className="avatar" alt="header" src={require('../img/header.png')} />
                <p className="author">XboxYan</p>
                <div className="social">
                    <a target="_blank" rel="noopener noreferrer" data-hover="github" className="social-links" href="https://github.com/XboxYan">
                        <i className="iconfont icon-Github"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" data-hover="segmentfault" className="social-links" href="https://segmentfault.com/u/xboxyan">
                        <i className="iconfont">Sf</i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" data-hover="weibo" className="social-links" href="https://weibo.com/3106589651">
                        <i className="iconfont icon-Weibo"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" data-hover="twitter" className="social-links" href="https://twitter.com/XboxYan">
                        <i className="iconfont icon-Twitter"></i>
                    </a>
                </div>
            </div>
        )
    }
}