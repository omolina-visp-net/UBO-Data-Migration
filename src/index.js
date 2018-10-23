import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Login from "./routes/Login/Login";

const apiUrl = process.env.REACT_APP_API_URL;
const path = "graphql"
const graphQLUrl = `${apiUrl}/${path}`;

const client = new ApolloClient({
    uri: graphQLUrl,
    request: async (operation) => {
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('Importer.token')
            }
        });
    },
    headers: {
        authorization: localStorage.getItem('Importer.token')
    }
});

const WebApp = () => (
    <ApolloProvider client={client}>
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route component={App}/>
            </Switch>
        </Router>
    </ApolloProvider>
);

ReactDOM.render(<WebApp/>, document.getElementById("root"));

serviceWorker.unregister();
