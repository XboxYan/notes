import React, { PureComponent, Fragment } from 'react';
import { Control } from 'react-keeper';
import fetchData from '../util/Fetch';
import Markview from '../components/markview';
import BackTop from '../components/backTop';

class CategoryGroup extends PureComponent {

    state = {
        checked: this.props.checked,
        categories:[]
    }

    getCategories = async () => {
        this.setState({ isrender: true });
        const categories = await fetchData(`/api/category`);
        this.setState({ categories: categories.data });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.checked!==nextProps.checked){
            this.setState({checked:nextProps.checked})
        }
    }

    onChange = (ev) => {
        const checked = [...this.state.checked];
        const target = ev.target;
        if (target.checked) {
            checked.push(target.id);
        } else {
            checked.splice(checked.findIndex((d) => d === target.id), 1);
        }
        this.props.onChange && this.props.onChange(checked);
        this.setState({ checked });
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { checked,categories } = this.state;
        this.value = checked;
        return (
            <Fragment>
                {
                    categories.length > 0 ? categories.map((d) => (
                        <Fragment key={d._id}>
                            <input className="checkbox" type="checkbox" onChange={this.onChange} checked={checked.indexOf(d._id) >= 0} id={d._id} />
                            <label className="article-tag" htmlFor={d._id} >{d.name}</label>
                        </Fragment>
                    ))
                        :
                        <label className="article-tag article-tag-loading">正在加载...</label>
                }
            </Fragment>
        )
    }
}

class MarkdownEditor extends PureComponent {

    state = {
        value: this.props.defaultValue
    };

    onChange = (e) => {
        const value = e.target.value;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({ value });
            this.props.onChange && this.props.onChange(value);
        }, 300)
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.defaultValue!==nextProps.defaultValue){
            this.setState({value:nextProps.defaultValue});
            this.textarea.value = nextProps.defaultValue;
        }
    }

    onkeydown = (e) => {
        if(e.keyCode===9){
            e.preventDefault();
            const target = e.target;
            const value = target.value;
            const positionS = target.selectionStart;
            const positionE = target.selectionEnd;
            target.value = value.substr(0,positionS)+'  '+value.substr(positionE);
            target.selectionStart = positionS+2;
            target.selectionEnd = positionS+2;
        }
    }

    render() {
        const { value } = this.state;
        this.value = value;
        const { className,rows,placeholder } = this.props;
        return (
            <div className={"mark-body "+className}>
                <textarea ref={node=>this.textarea=node} placeholder={placeholder} spellCheck={false} onKeyDown={this.onkeydown} onChange={this.onChange} rows={rows} className="mark-textarea edit-input" />
                <div className="mark-preview"><Markview value={value} /></div>
            </div>
        )
    }
}

export default class extends PureComponent {
    state = {
        isrender: true,
        article:{},
    }


    getArticle = async (id) => {
        this.setState({isrender:true});
        const article = await fetchData(`/api/article/${id}?admin=true`);
        this.setState({ article: article.data, isrender: false });
        this.title.value = article.data.title || '';
    }

    componentDidMount() {
        this.id = Control.path.split('publish/')[1];
        if(this.id){
            this.getArticle(this.id);
        }
        //this.getArticle();
    }

    componentWillReceiveProps(nextProps) {
        if( Control.path.indexOf('publish/')>=0 && this.props.pathname!==nextProps.pathname && this.id!== Control.path.split('publish/')[1]){
            this.id = Control.path.split('publish/')[1];
            this.getArticle(this.id);
        }else{
            this.id = null;
            this.title.value = '';
            this.setState({ article: {}});
        }
    }

    onSubmit = async () => {
        const article = {
            title:this.title.value,
            categories:this.categories.value,
            description:this.description.value,
            content:this.content.value,
        }
        if(this.id){
            //更新
            const articleInfo = await fetchData(`/api/article/${this.id}`,{
                method:'PUT',
                body:JSON.stringify(article)
            });
            if(articleInfo.success){
                console.log('success1')
                Control.go(-1);
            }
        }else{
            article.userId = "5b34af1cf532152535c6c03a"
            //发布
            const articleInfo = await fetchData(`/api/article`,{
                method:'POST',
                body:JSON.stringify(article)
            });
            if(articleInfo.success){
                console.log('success2')
                Control.go(-1);
            }
        }
    }

    goTop = () => {
        document.getElementById("publish-con").scrollTo({top:0,behavior: 'smooth' })
    }

    render() {
        const {article:{categories=[],description='',content=''}} = this.state;

        return (
            <div className="container admin-container" id="publish-con">
                <section className="main sildeUpMin">
                    <div className="admin-title">标题</div>
                    <input ref={node=>this.title=node} spellCheck={false} className="edit-input"  />
                    <div className="admin-title">分类</div>
                    <CategoryGroup  ref={node=>this.categories=node}  checked={categories} />
                    <div className="admin-title">简介</div>
                    <MarkdownEditor ref={node=>this.description=node} rows={3} placeholder="一些简介~" defaultValue={description} />
                    <div className="admin-title">正文</div>
                    <MarkdownEditor ref={node=>this.content=node} className="admin-content" rows={10} placeholder="开始写文章吧!" defaultValue={content}  />
                    <span className="admin-add-button" onClick={this.onSubmit} >立即发布</span>
                </section>
                <BackTop onClick={this.goTop} />
            </div>
        )
    }
}