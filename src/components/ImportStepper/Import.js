import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ImportStepper from "./ImportStepper";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import CircularProgress from '@material-ui/core/CircularProgress';


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
    }
});

const subscribers = {};
const data = [{
    subscribers
}];


function getSteps() {
    return ['UPLOAD', 'MAP DATA', 'IMPORT'];
}


class Import extends Component {
    state = {
        activeStep: 0,
        success: false,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));

        const {activeStep} = this.state;
        const steps = getSteps();
        if (activeStep === steps.length - 1) {
            this.setState({success: true});
            setTimeout(() => {
                this.props.handleClose();
            }, 1000);
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };


    render() {
        const {classes, handleClose, selectedEntity} = this.props;
        const {activeStep, success} = this.state;
        const steps = getSteps();
        return (
            <div className={classes.header}>
                {success ? (
                    <div className={classes.loaderContent}>
                        < CircularProgress className={classes.progress} size={100}/>
                    </div>
                ) : (
                    <React.Fragment>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                    Import {selectedEntity}
                                </Typography>

                                <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                                    <CloseIcon/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Divider light/>
                        <ImportStepper data={data}
                                       handleBack={this.handleNext}
                                       handleNext={this.handleNext}
                                       steps={steps}
                                       activeStep={activeStep}
                        />

                        <AppBar position="fixed" color="primary" className={classes.appBar}>
                            <Toolbar className={classes.toolbar}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}
                                    variant="contained"
                                    color="primary"
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Import' : 'Next'}
                                </Button>

                            </Toolbar>
                        </AppBar>
                    </React.Fragment>
                )}
            </div>


        );
    }
}

Import.propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedEntity: PropTypes.string.isRequired
};
export default withStyles(styles)(Import);
