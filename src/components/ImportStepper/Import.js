import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ImportStepper from "./ImportStepper";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ImportDataContext} from "../../context/ImportDataProvider";
import FooterControls from "./FooterControls";


const styles = theme => ({
    header: {
        margin: theme.spacing.unit * 4,
    },
    content: {
        marginTop: '20%'
    },
    grow: {
        flexGrow: 1,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    loaderContent: {
        position: "absolute",
        margin: "auto",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100px",
        height: "100px"
    },
    paper: {
        paddingBottom: 50,
    },
    bottomControls: {
        marginTop: theme.spacing.unit + 5
    }
});

class Import extends Component {
    render() {
        const {classes} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    return (
                        <div className={classes.header}>
                            {context.success ? (
                                <div className={classes.loaderContent}>
                                    < CircularProgress className={classes.progress} size={100}/>
                                </div>
                            ) : (

                                <React.Fragment>
                                    <Typography variant="h6" color="inherit" className={classes.grow}>
                                        Import Customers
                                    </Typography>
                                    <Divider light/>
                                    <ImportStepper className={classes.paper}/>
                                    <FooterControls/>

                                </React.Fragment>
                            )}
                        </div>)
                }}

            </ImportDataContext.Consumer>
        );
    }
}

Import.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Import);
