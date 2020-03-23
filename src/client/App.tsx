import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import editPage from './pages/editPage'
import NewChirp from './pages/newChirp'

class App extends React.Component<AppProps, AppState> {

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/:id/editChirp" component={editPage}/>
					<Route exact path="/NewChirp" component={NewChirp}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

interface AppProps { }
interface AppState { }

export default App;
