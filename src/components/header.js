import React from 'react';
import User from './user';
import { Link, Control } from 'react-keeper';

export default ({loginState,userInfo,logout}) => (
    <header className='header' style={{opacity:Control.path==='/login'?0:1}}>
        <nav className='header-nav'>
            <span className='iconfont icon-menu mobile-toggle'></span>
            <div className='header-menu'>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/'>首页</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/archives'>归档</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/categories'>分类</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/about'>关于</Link>
                {
                    loginState?
                    <User userInfo={userInfo} logout={logout} />
                    :
                    <Link className='header-menu-link' activeClassName='header-menu-active' to='/login'>登录</Link>
                }
                <Link className='iconfont icon-menu-search header-menu-link' to={ (Control.path==='/'?'/home':Control.path) +'/search' } > </Link>
            </div>
        </nav>
    </header>
)