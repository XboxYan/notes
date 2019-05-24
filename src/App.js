import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter } from 'react-keeper';

import Index from './pages';
import ReactAplayer from 'react-aplayer';
import evanyou from './util/evanyou';
import './App.css';



class App extends PureComponent {

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
