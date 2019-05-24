import React, { PureComponent } from 'react';
import Footer from '../components/footer';

export default class extends PureComponent {
    render() {
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">关于</span>
                    <div className="post-content "><p><img className="fadeIn" src={require("../img/about.jpg")} alt="no img" /></p>
                        <blockquote>
                            <p>Drawing by Alena Aenami.</p>
                        </blockquote>
                        <h2 id="About-Me">About Me</h2>
                        <blockquote className="scrollIn">
                            <p>世界美好 你也是。<br />
                                Theme - <a href="https://github.com/Lemonreds/hexo-theme-Nayo" rel="noopener noreferrer" target="_blank">Nayo</a><br />
                                Location  - HuBei | WuHan CN<br />
                                Email - <a href="mailto:yanwenbin1991@live.com" rel="noopener noreferrer">yanwenbin1991@live.com</a>
                            </p>
                        </blockquote>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}