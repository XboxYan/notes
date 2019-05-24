import React, { PureComponent,Fragment } from 'react';

export default class extends PureComponent {
    render() {
        return (
            <Fragment>
                <span className="donate-btn">
                    <span className="iconfont icon-donate"></span>
                </span>
                <div id="donate-box" className="sildeUpMin">
                    <span className="donate-cancel iconfont icon-cancel"></span>
                    <div className="donate-img-box">
                        <img className="noLazyLoad donate-img" src={require("../img/wechat.png")} alt="wechat" />
                        <img className="noLazyLoad donate-img" src={require("../img/alipay.jpg")} alt="alipay" />
                    </div>
                    <span className="donate-word">世界美好 你也是</span>

                    <div className="donate-list">
                        <span className="iconfont icon-donate-wechat"></span>
                        <span className="iconfont icon-donate-alipay"></span>
                    </div>
                </div>
            </Fragment>
        )
    }
}