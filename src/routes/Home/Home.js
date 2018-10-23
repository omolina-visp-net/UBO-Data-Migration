import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Import from "../../components/ImportStepper/Import";
import {EntityContext} from "../../context/EntityProvider";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    content: {
        position: "absolute",
        margin: "auto",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "25%",
        height: "100px"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Home extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = (context, optionIndex) => e => {
        context.setSelectedEntity(optionIndex);
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.content}>
                <EntityContext.Consumer>
                    {context => {
                        // if (!context) return (<div></div>);
                        return (
                            <div style={{display: "inline-block"}}>
                                <Grid container className={classes.root} spacing={16}>
                                    <Grid item xs={12}>
                                        <Grid container className={classes.demo} justify="center" spacing={Number(16)}>

                                            <Grid key={"customer"} item>
                                                <Button variant="contained" color="primary" className={classes.button}
                                                        onClick={this.handleClickOpen(context, 0)}>
                                                    Import Customers
                                                </Button>
                                            </Grid>
                                            <Grid key={"packages"} item>
                                                <Button variant="contained" color="primary" className={classes.button}
                                                        onClick={this.handleClickOpen(context, 1)}>
                                                    Import Packages
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Dialog
                                    fullScreen
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    TransitionComponent={Transition}
                                >
                                    <Import handleClose={this.handleClose} selectedEntity={context.selectedEntity}/>
                                </Dialog>
                            </div>
                        );
                    }}
                </EntityContext.Consumer>
            </div>
        );
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);