import React, {Component} from 'react'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import IspProvider from "./context/IspProvider";
import EntityProvider from "./context/EntityProvider";
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./routes/Login/PrivateRoute";
import Home from "./routes/Home/Home";
import Page404 from "./routes/Page404";

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
                        <Switch>
                            <PrivateRoute exact path="/" component={Home}/>
                            <Route component={Page404}/>
                        </Switch>
                    </MuiThemeProvider>
                </EntityProvider>
            </IspProvider>
        )
    }
}

export default App