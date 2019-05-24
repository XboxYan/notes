import React, { PureComponent } from 'react';
import Footer from '../components/footer';

export default class extends PureComponent {
    render() {
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">Admin</span>
                </section>
                <Footer />
            </div>
        )
    }
}