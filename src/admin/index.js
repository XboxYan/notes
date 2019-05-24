import React, { PureComponent } from 'react';
import { Route } from 'react-keeper';
import Loadable from 'react-loadable';
import Nav from '../components/nav';
import Loader from '../components/loader';
import '../admin.css';

const Home = Loadable({
	loader:()=>import('./home'),
	loading:Loader
})

const Article = Loadable({
	loader:()=>import('./article'),
	loading:Loader
})

const Category = Loadable({
	loader:()=>import('./category'),
	loading:Loader
})

const Publish = Loadable({
	loader:()=>import('./publish'),
	loading:Loader
})

export default class extends PureComponent {
    render() {
        return (
            <div className="app">
                <Nav />
                <Route index miss cache='parent' component={Home} />
                <Route cache='parent' path="/article-list"  component={Article} />
                <Route cache='parent' path="/category-list" component={Category} />
                <Route cache='parent' path="/publish" component={Publish} />
            </div>
        );
    }
}
