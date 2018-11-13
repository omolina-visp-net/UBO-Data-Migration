import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar/Avatar";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Category from '@material-ui/icons/Category';
import vispIcon from "../../assets/sidenav-logo-small.png";
import {withRouter} from "react-router-dom";
import IspSelect from "../../components/IspSelect";
import {IspContext} from "../../context/IspProvider"
import Typography from "@material-ui/core/Typography/Typography";
import ImportDataProvider from "../../context/ImportDataProvider";
import Import from "../../components/ImportStepper/Import";

const drawerWidth = 260;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        marginLeft: 10,
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    avatar: {
        margin: "auto",
        width: 24,
        height: 40
    },
    chevron: {
        color: 'white'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        backgroundColor: '#1565c0',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    contentHeader: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        maxWidth: '97%',
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});


class Home extends React.Component {
    state = {
        open: false,
        dialogOpen: false
    };

    handleClose = () => {
        this.setState({dialogOpen: false});
    };


    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };


    handleLogout = () => {
        localStorage.removeItem("Importer.token");
        localStorage.removeItem("Importer.appuserId");
        localStorage.removeItem("Importer.ispId");
        localStorage.removeItem("Importer.selectedIspId");
        this.props.history.push("/login");
        window.location.reload();
    }

    render() {
        const {classes, theme} = this.props;
        const {open} = this.state;
        return (


            <IspContext.Consumer>
                {context => {
                    if (
                        context.state.ispId > 0
                    )
                        return (
                            <div className={classes.root}>
                                <AppBar
                                    position="fixed"
                                    className={classNames(classes.appBar, {
                                        [classes.appBarShift]: open,
                                    })}>
                                    <Toolbar disableGutters={!open}>
                                        <IconButton
                                            color="inherit"
                                            aria-label="Open drawer"
                                            onClick={this.handleDrawerOpen}
                                            className={classNames(classes.menuButton, open && classes.hide)}
                                        >
                                            <MenuIcon/>
                                        </IconButton>

                                        <IconButton color="inherit" aria-label="Menu"
                                                    className={classNames(open && classes.hide)}>
                                            <Avatar alt="Visp.net" src={vispIcon} className={classes.avatar}/>
                                        </IconButton>

                                        {open ? (
                                            <Typography
                                                className={classes.grow}>
                                            </Typography>) : (<IspSelect
                                            appuserId={context.state.appuserId}
                                            ispId={Number.parseInt(context.state.ispId, 10)}
                                            setIspId={context.setIspId}
                                        />)
                                        }

                                        <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                                    </Toolbar>
                                </AppBar>

                                <Drawer
                                    className={classes.drawer}
                                    variant="persistent"
                                    anchor="left"
                                    open={open}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <div className={classes.drawerHeader}>
                                        <IconButton color="inherit" aria-label="Menu"
                                                    className={classNames(!open && classes.hide)}>
                                            <Avatar alt="Visp.net" src={vispIcon} className={classes.avatar}/>
                                        </IconButton>
                                        <IspSelect
                                            appuserId={context.state.appuserId}
                                            ispId={Number.parseInt(context.state.ispId, 10)}
                                            setIspId={context.setIspId}
                                        />
                                        <IconButton onClick={this.handleDrawerClose} className={classes.chevron}>
                                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                                        </IconButton>
                                    </div>
                                    <Divider/>
                                    <List>
                                        {['Customers', 'Packages'].map((text, index) => (
                                            <ListItem button key={text}>
                                                <ListItemIcon>{index % 2 === 0 ? <SupervisorAccountIcon/> :
                                                    <Category/>}</ListItemIcon>
                                                <ListItemText primary={text}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Drawer>

                                <main
                                    className={classNames(classes.content, {
                                        [classes.contentShift]: open,
                                    })}
                                >
                                    <div className={classes.contentHeader}/>
                                    <ImportDataProvider>
                                        <Import handleClose={this.handleClose}/>
                                    </ImportDataProvider>
                                </main>
                            </div>
                        );
                    return null;
                }}
            </IspContext.Consumer>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(withRouter(Home));