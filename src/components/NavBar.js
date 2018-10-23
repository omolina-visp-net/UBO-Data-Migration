import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar/Avatar";
import vispIcon from "../assets/sidenav-logo-small.png";
import {withRouter} from "react-router-dom";
import IspSelect from "./IspSelect";
import {IspContext} from "../context/IspProvider"

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        marginLeft: 10,
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    avatar: {
        margin: "auto",
        width: 24,
        height: 40
    }
};


class NavBar extends React.Component {
    handleLogout = () => {
        localStorage.removeItem("Importer.token");
        localStorage.removeItem("Importer.appuserId");
        localStorage.removeItem("Importer.ispId");
        localStorage.removeItem("Importer.selectedIspId");
        this.props.history.push("/login");
        window.location.reload();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <Avatar alt="Visp.net" src={vispIcon} className={classes.avatar}/>
                        </IconButton>

                        <IspContext.Consumer>
                            {context => {
                                if (
                                    context.state.ispId > 0
                                )
                                    return (
                                        <IspSelect
                                            appuserId={context.state.appuserId}
                                            ispId={Number.parseInt(context.state.ispId, 10)}
                                            setIspId={context.setIspId}
                                        />
                                    );
                                return null;
                            }}
                        </IspContext.Consumer>
                        <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NavBar));