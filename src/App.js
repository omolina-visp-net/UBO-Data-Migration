import React, {Component} from 'react'
import NavBar from './components/NavBar'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Route, Switch} from "react-router-dom";
import Page404 from "./routes/Page404";
import PrivateRoute from "./routes/Login/PrivateRoute";
import IspProvider from "./context/IspProvider";
import Home from "./routes/Home/Home";
import EntityProvider from "./context/EntityProvider";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4383cc',
            main: '#1565c0',
            dark: '#0e4686',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f44336',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                color: 'white',
            },
        },
    },
});


class App extends Component {
    onIspSelected = () => {
        console.log("Domain change");
    }

    render() {
        return (
            <IspProvider>
                <EntityProvider>
                    <MuiThemeProvider theme={theme}>
                        <NavBar/>
                        <div>
                            <Switch>
                                <PrivateRoute exact path="/" component={Home}/>
                                <Route component={Page404}/>
                            </Switch>
                        </div>
                    </MuiThemeProvider>
                </EntityProvider>
            </IspProvider>
        )
    }
}

export default App