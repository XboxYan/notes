import React, { PureComponent } from 'react';

export default class extends PureComponent {
    render() {
        return (
            <a className="backTop leftIn" onClick={this.props.onClick}>
                <span>
                    <i className="iconfont icon-backtotop"></i>
                </span>
            </a>
        )
    }
}