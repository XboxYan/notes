import React, { PureComponent,Fragment } from 'react';
import { CacheLink } from 'react-keeper';
import fetchData from '../util/Fetch';
import Loader from '../components/loader';
import Footer from '../components/footer';
import moment from 'moment';

export default class extends PureComponent {
    state = {
        articles:[],
        isrender: true
    }

    getArticle = async () => {
        const articles = await fetchData('/api/archives');
        this.setState({articles:articles.data,isrender:false});
    }
    
    componentDidMount() {
        this.getArticle();
    }

    render() {
        const {articles,isrender} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">归档</span>
                    <section className="archive slideDownMin">
                        {
                            isrender?
                            <Loader/>
                            :
                            articles.map((d,i)=>(
                                <Fragment key={i}>
                                    <h3 className="archive-year">{ moment(d.createdAt).utcOffset(8).format("YYYY年M月") }</h3>
                                    {
                                        d.article.map(article=>(
                                            <div className="archive-item" key={article._id}>
                                                <span className="archive-time">{moment(article.createdAt).utcOffset(8).format("M月D日")}</span>
                                                <span className="archive-title">
                                                    <CacheLink to={"/article/"+article._id}>{article.title}</CacheLink>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </Fragment>
                            ))
                        }
                    </section>
                </section>
                <Footer />
            </div>
        )
    }
}