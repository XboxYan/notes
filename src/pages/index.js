import React, { PureComponent } from 'react';
import { Route } from 'react-keeper';
import Header from '../components/header';
import Loadable from 'react-loadable';
import Loader from '../components/loader';

const Home = Loadable({
	loader:()=>import('./home'),
	loading:Loader
})

const Archives = Loadable({
	loader:()=>import('./archives'),
	loading:Loader
})

const Categories = Loadable({
	loader:()=>import('./categories'),
	loading:Loader
})

const Search = Loadable({
	loader:()=>import('./search'),
	loading:Loader
})

const About = Loadable({
	loader:()=>import('./about'),
	loading:Loader
})

const Article = Loadable({
	loader:()=>import('./article'),
	loading:Loader
})

export default class extends PureComponent {
    render() {
        return (
            <div className="app">
                <Header {...this.props} />
                <Route index cache='parent' component={Home} path="/home" />
                <Route cache='parent' component={Archives} path="/archives" />
                <Route cache='parent' component={Categories} path="/categories" />
                <Route cache='parent' component={About} path="/about" />
                <Route component={Article} path="/article/:id" />
                <Route cache='false' component={Search} path="/search" />
            </div>
        );
    }
}
