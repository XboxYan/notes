import React, { PureComponent } from 'react';

export default class extends PureComponent {
    state = {
        page: 1,
    }

    go = (dir) => () => {
        const { page } = this.state;
        const { total, pagesize,pageInfo:{startCursor,endCursor} } = this.props;
        let $page = Math.max(Math.min(page + dir, Math.ceil(total / pagesize)), 1);
        this.setState({ isrender: true, page:$page });
        this.props.fetch && this.props.fetch(dir>0?{after:endCursor}:{before:startCursor});
    }

    render() {
        const { total, pagesize } = this.props;
        const max = Math.ceil(total / pagesize);
        const { page } = this.state;
        return (
            total?
            <nav className="paginator scrollIn">
                <a className="prev" data-hidden={page === 1} onClick={this.go(-1)}><i className="iconfont icon-left"></i>上一页</a>
                <span className="page-number">Page {page} / {max}.</span>
                <a className="next" data-hidden={page === max} onClick={this.go(1)}>下一页<i className="iconfont icon-right"></i></a>
            </nav>
            :null
        )
    }
}
