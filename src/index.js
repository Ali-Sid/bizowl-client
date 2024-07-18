import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/client';
import Login from 'components/Auth/Login';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import Register from 'components/Auth/Signup';
import PrivateRoute from './components/PrivateRoute'; // Adjust the import path as needed


ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			{/* <ThemeEditorProvider> */}
				{/* <HashRouter> */}
					<Router>
					<Switch>
						<PrivateRoute path={`/auth`} component={AuthLayout} />
						<PrivateRoute path={`/client`} component={AdminLayout} />
						<PrivateRoute path={`/rtl`} component={RtlLayout} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Register} />
						<Redirect from='/' to='/client' />
					</Switch>
					</Router>
				{/* </HashRouter> */}
			{/* </ThemeEditorProvider> */}
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
