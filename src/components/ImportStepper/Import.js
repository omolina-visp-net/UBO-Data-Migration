import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ImportStepper from "./ImportStepper";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ImportDataContext} from "../../context/ImportDataProvider";
import FooterControls from "./FooterControls";
import AlertDialog from "./AlertDialog";


const styles = theme => ({
    header: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
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
        const {classes, entity, handleCloseDialog, openDialog, setActiveImport} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    const {loading} = context.state;
                    return (
                        <div className={classes.header}>
                            {loading ? (
                                <div className={classes.loaderContent}>
                                    < CircularProgress className={classes.progress} size={100}/>
                                </div>
                            ) : (
                                <React.Fragment>
                                    <Typography variant="display1" color="inherit" className={classes.grow}>
                                        Import {entity.name}
                                    </Typography>
                                    <Divider light/>
                                    <ImportStepper className={classes.paper}/>
                                    <FooterControls setActiveImport={setActiveImport}/>
                                    <AlertDialog open={openDialog} handleClose={handleCloseDialog}/>
                                </React.Fragment>
                            )}
                        </div>)
                }}

            </ImportDataContext.Consumer>
        );
    }
}

Import.propTypes = {
    classes: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
    setActiveImport: PropTypes.func.isRequired,
    activeImport: PropTypes.bool.isRequired,
    openDialog: PropTypes.bool.isRequired,
};
export default withStyles(styles)(Import);
