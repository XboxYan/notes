import React, { PureComponent } from 'react';
import fetchData from '../util/Fetch';
import Footer from '../components/footer';
import Loader from '../components/loader';
import Pager from '../components/pager';
import moment from 'moment';
import { CacheLink } from 'react-keeper';

export default class extends PureComponent {
    pagesize = 5;

    state = {
        articles:[],
        total:0,
        isrender:true
    }

    getArticle = async (page=1) => {
        this.setState({isrender:true});
        const articles = await fetchData(`/api/article?page=${page}&pagesize=${this.pagesize}`);
        this.setState({articles:articles.data,total:articles.counts,isrender:false});
    }

    onhandle = (dir) => () => {
        const { total, page } = this.state;
        let $page = Math.max(Math.min(page + dir,Math.ceil(total/this.pagesize)),1);
        this.getArticle($page);
    }

    componentDidMount () {
        this.getArticle(1);
    }

    render() {
        const {articles,total,isrender} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">共{total}篇文章</span>
                    <table className="table-con">
                        <thead>
                            <tr>
                                <th>_id</th>
                                <th>标题</th>
                                <th>发布时间</th>
                                <th>访问量</th>
                                <th>分类</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isrender && articles.map(article=>(
                                    <tr key={article._id}>
                                        <td>{article._id}</td>
                                        <td><CacheLink to={"/article/"+article._id}>{article.title}</CacheLink></td>
                                        <td>{moment(article.createdAt).utcOffset(8).format("YYYY年M月D日 , HH:mm:ss")}</td>
                                        <td>{article.views}</td>
                                        <td>{article.categories.map((category,i)=><CacheLink key={i} className="article-tag" to={"/categories/"+category._id}>{category.name}</CacheLink>)}</td>
                                        <td>
                                            <CacheLink className="tag-wrap" to={'admin/publish/'+article._id} >编辑</CacheLink>
                                            <a className="tag-wrap">删除</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        isrender&&<Loader/>
                    }
                    <CacheLink type="span" className="admin-add-button" to="/admin/publish" >现在发布</CacheLink>
                    <Pager
                        total={total}
                        pagesize={this.pagesize}
                        fetch={this.getArticle}
                    />
                </section>
                <Footer />
            </div>
        )
    }
}