import React, { PureComponent } from 'react';
import { Control,CacheLink,Route } from 'react-keeper';
import Footer from '../components/footer';
import Loader from '../components/loader';
import Pager from '../components/pager';
import fetchData from '../util/Fetch';
import { getArticleList,getCategory } from '../util/api';
import moment from 'moment';

class Category extends PureComponent {

    pagesize = 5;

    state = {
        isrender:true,
        total:1,
        renderPage:true,
        pageInfo:{},
        articles:[]
    }

    getArticle = (category='') => async (page=1) => {
        if(category){
            this.setState({isrender:true});
            const { data:{repository:{issues:{nodes,pageInfo,totalCount}}} } = await getArticleList({pagesize:this.pagesize,labels:category});
            this.setState({articles:nodes,total:totalCount,isrender:false,pageInfo:pageInfo,renderPage:true});
        }
    }

    async componentDidMount() {
        const category = Control.path.split("/categories/")[1]||"";
        this.category = category;
        this.getArticle(category)();
    }

    componentWillReceiveProps(nextProps) {
        if( this.category!==nextProps.params.category && nextProps.pathname.indexOf('search')<0 && nextProps.pathname.indexOf('categories/')>=0 && this.props.pathname!==nextProps.pathname){
            const {category} = nextProps.params;
            this.category = category;
            this.setState({renderPage:false});
            this.getArticle(category)();
        }
    }

    render(){
        const {articles,total,isrender,renderPage,pageInfo} = this.state;
        const category = this.category||"";
        return (
            <section className="slideDownMin">
                {
                    isrender?
                    <Loader/>
                    :
                    (
                        articles.length>0?
                        articles.map(article=>(
                            <article className="item" key={article.number}>
                                <time className="item-date"> {moment(article.createdAt).utcOffset(8).format("YYYY年M月D日")}</time>
                                <CacheLink className="item-title" to={"/article/"+article.number}>{article.title}</CacheLink>
                            </article>
                        ))
                        :
                        <div className="iconfont icon-nofound empty"></div>
                    )
                }
                {
                    renderPage&&<Pager
                        total={total}
                        pagesize={this.pagesize}
                        fetch={this.getArticle(category)}
                    />
                }
            </section>
        )
    }
}

export default class extends PureComponent {
    state = {
        categories: []
    }

    async componentDidMount() {
        const { data:{repository:{labels:{nodes}}} }= await getCategory();
        this.setState({ categories: nodes });
    }

    render() {
        const {categories} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <section>
                        <h2 className="page-title">分类</h2>
                        {
                            categories.filter(el=>!el.isDefault).map(d=>(
                                <CacheLink key={d.name} activeClassName="tag-active" to={ "/categories/"+ d.name } className="tag-wrap">
                                    <span className="iconfont icon-tag-inner"></span>
                                    <span className="tag-name"> {d.name} </span>
                                </CacheLink>
                            ))
                        }
                    </section>
                    <Route cache='parent' component={Category} path="/:category" />                
                </section>
                <Footer />
            </div>
        )
    }
}