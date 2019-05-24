import React from 'react';
import { Link } from 'react-keeper';

export default () => (
    <header className='header'>
        <nav className='header-nav'>
            <span className='iconfont icon-menu mobile-toggle'></span>
            <div className='header-menu'>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin'>首页</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin/article-list'>文章管理</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin/category-list'>分类管理</Link>
            </div>
        </nav>
    </header>
)