import React, { PureComponent } from 'react';
import fetchData from '../util/Fetch';
import Footer from '../components/footer';
import Loader from '../components/loader';
import moment from 'moment';
import { CacheLink } from 'react-keeper';

class Edit extends PureComponent {

    state = {
        show:false,
        title:'',
    }

    show = (oname,title,cb) => {
        this.input.value = oname;
        this.setState({show:true,title});
        this.input.focus();
        this.onSubmit = (ev) => {
            ev.preventDefault();
            cb(this.input.value.replace(/\s+/g, ""),this.hide);
        }
    }

    hide = () => {
        this.setState({show:false});
    }

    render() {
        const { show,title } = this.state;
        return (
            <div className="mask" style={{display:show?'block':'none'}}>
                <form className="edit-container sildeUpMin" onSubmit={this.onSubmit} >
                    <input spellCheck={false} ref={node=>this.input=node} type="text" placeholder={title} className="edit-input" />
                    <span className="edit-cancel iconfont icon-cancel" onClick={this.hide}></span>
                </form>
            </div>
        )
    }
}

export default class extends PureComponent {

    state = {
        categories: [],
        isrender: true
    }

    getCategories = async () => {
        this.setState({ isrender: true });
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data, isrender: false });
    }

    componentDidMount() {
        this.getCategories();
    }

    onEdit = (id,oname) => () => {
        this.popedit.show(oname,'修改分类',async(name,cb)=>{
            if(name){
                const categoryInfo = await fetchData(`/api/category/${id}`,{
                    method:'PUT',
                    body:JSON.stringify({name})
                });
                if(categoryInfo.success){
                    await this.getCategories();
                    cb&&cb();
                }
            }
        })
    }

    onAdd = () => {
        this.popedit.show('','新增分类',async(name,cb)=>{
            if(name){
                const categoryInfo = await fetchData(`/api/category`,{
                    method:'POST',
                    body:JSON.stringify({name})
                });
                if(categoryInfo.success){
                    await this.getCategories();
                    cb&&cb();
                }
            }
        })
    }

    onDel = (id) => async () => {
        const categoryInfo = await fetchData(`/api/category/${id}`,{
            method:'DELETE'
        });
        if(categoryInfo.success){
            await this.getCategories();
        }
    }

    render() {
        const { categories, isrender } = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <span className="page-title">共{categories.length}个分类</span>
                    <table className="table-con">
                        <thead>
                            <tr>
                                <th>_id</th>
                                <th>名称</th>
                                <th>创建时间</th>
                                <th>更新时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isrender && categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category._id}</td>
                                        <td><CacheLink to={"/categories/" + category._id}>{category.name}</CacheLink></td>
                                        <td>{moment(category.createdAt).utcOffset(8).format("YYYY年M月D日 , HH:mm:ss")}</td>
                                        <td>{moment(category.updatedAt).utcOffset(8).format("YYYY年M月D日 , HH:mm:ss")}</td>
                                        <td>
                                            <a className="tag-wrap" onClick={this.onEdit(category._id,category.name)}>编辑</a>
                                            <a className="tag-wrap" onClick={this.onDel(category._id)}>删除</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        isrender && <Loader />
                    }
                    <span className="admin-add-button" onClick={this.onAdd}>添加分类</span>
                </section>
                <Footer />
                <Edit ref={node=>this.popedit=node} />
            </div>
        )
    }
}