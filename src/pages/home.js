import React, { PureComponent } from 'react';
import Loader from '../components/loader';
import Profile from '../components/profile';
import BackTop from '../components/backTop';
import Footer from '../components/footer';
import Pager from '../components/pager';
import fetchData from '../util/Fetch';
import { getArticleList } from '../util/api';
import { CacheLink } from 'react-keeper';
import moment from 'moment';

export default class extends PureComponent {

    pagesize = 5;

    state = {
        articles:[],
        total:1,
        isrender:true,
        pageInfo:{}
    }

    getArticle = async (options) => {
        this.goTop();
        this.setState({isrender:true});
        const { data:{repository:{issues:{nodes,pageInfo,totalCount}}} } = await getArticleList({pagesize:this.pagesize,...options});
        // console.log(data)
        // const articles = await fetchData(`/api/article?page=${page}&pagesize=${this.pagesize}`);
        this.setState({articles:nodes,total:totalCount,pageInfo:pageInfo,isrender:false});
    }

    toIndex = () => {
        this.getArticle({});
        this.Pager.setState({page:1})
    }
    
    componentDidMount () {
        this.getArticle({});
    }

    goTop = () => {
        document.getElementById("index-con").scrollTo({top:0,behavior: 'smooth' })
    }
    
    render() {
        const {articles,total,isrender,pageInfo} = this.state;
        return (
            <div className="container" id="index-con">
                <section className="main sildeUpMin">
                    <Profile onClick={this.toIndex}/>
                    {
                        isrender?
                        <Loader/>
                        :
                        articles.map((article)=>(
                            <article className="article" key={article.id}>
                                <div className="article-header">
                                    <CacheLink className="article-title" to={"/article/"+article.number}>{article.title}</CacheLink>
                                    <div className="article-meta">{ moment(article.createdAt).utcOffset(8).format("YYYY年M月D日") }<span className="iconfont icon-star"></span>
                                        {
                                            article.labels.nodes.length>0
                                            ?
                                            article.labels.nodes.map((category,i)=>(
                                                <CacheLink key={i} className="article-tag" to={"/categories/"+category.name}>{category.name}</CacheLink>
                                            ))
                                            :
                                            <CacheLink className="article-tag" to="/categories/unknown">未分类</CacheLink>
                                        }
                                    </div>
                                </div>
                                <div className="article-excerpt">
                                    {article.description}
                                </div>
                                <div className="article-bottom">
                                    <CacheLink className="article-readmore" to={"/article/"+article.number}>阅读更多</CacheLink>
                                </div>
                            </article>
                        ))
                    }
                    <Pager
                        ref={node=>this.Pager=node}
                        total={total}
                        pageInfo={pageInfo}
                        pagesize={this.pagesize}
                        fetch={this.getArticle}
                    />
                </section>
                <BackTop onClick={this.goTop} />
                <Footer/>
            </div>
        )
    }
}