import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route, Control } from 'react-keeper';
import Loadable from 'react-loadable';
import Loader from './components/loader';
import ReactAplayer from 'react-aplayer';
import evanyou from './util/evanyou';
import './App.css';

const Index = Loadable({
	loader:()=>import('./pages'),
	loading:Loader
})

const Admin = Loadable({
	loader:()=>import('./admin'),
	loading:Loader
})

const Login = Loadable({
	loader:()=>import('./login'),
	loading:Loader
})


class App extends PureComponent {

	state = {
		loginState:window.localStorage.loginInfo,
		userInfo:window.localStorage.loginInfo ? JSON.parse(window.localStorage.loginInfo):{}
	}

	loginFilter = (cb, props) => {
		if(this.state.loginState && this.state.userInfo.isAdmin){
			cb();
		}else{
			Control.replace('/login');
		}
	}

	login = (userInfo) => {
		this.setState({loginState:true,userInfo});
		Control.go(-1);
	}

	logout = () => {
		window.localStorage.removeItem('loginInfo');
		this.setState({loginState:false,userInfo:{}});
	}

	getPlayList = (id) => {
		return fetch(`/api/playlist/${id}`)
		.then((response) => {
            if (response.ok) {
                return response.json() || {};
            }else{
				return {};
			}
        })
        .catch((err) => {
			console.warn(err);
			return {};
        })
	}

	async componentDidMount() {
		evanyou();
		//const data = await this.getPlayList('21711688');
		//this.alpayer.list.add(data.data||[])
	}
	

	render() {
		const {loginState,userInfo} = this.state;
		return (
			<BrowserRouter>
				<Fragment>
					<Index/>
					<ReactAplayer 
						onInit={ap => this.alpayer = ap}
						theme="#e26d6d"
						order="random"
						lrcType={3}
						fixed={true}
						mini={true}
						listFolded={true}
						audio={[]}
					/>
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
