import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ImportOptions from "../ImportOptions/ImportOptions";
import MapDataTable from "../MapDataTable/MapDataTable";
import Paper from '@material-ui/core/Paper';
import ReviewDataTable from "../ReviewDataTable/ReviewDataTable";
import {ImportDataContext} from "../../context/ImportDataProvider";
import ImportSuccess from "./ImportSuccess";


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 5,
    },
    content: {
        margin: theme.spacing.unit + 5,
        paddingBottom: theme.spacing.unit + 5,
        height: 'auto'
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    mapData: {
        width: '90%',
        height: `${theme.spacing.unit * 10}px`,
        marginTop: theme.spacing.unit * 5,
    },
});

function getStepContent(context) {
    const {activeStep} = context;
    switch (activeStep) {
        case 0:
            return renderImportOptions();
        case 1:
            return renderMapDataTable();
        case 2:
            return renderReviewDataTable();
        default:
            return 'Uknown stepIndex';
    }
}

function renderImportOptions() {
    return (
        <ImportOptions/>
    );
}

function renderMapDataTable() {
    return (
        <MapDataTable/>
    );
}

function renderReviewDataTable() {
    return (
        <ReviewDataTable/>
    );
}

class ImportStepper extends React.Component {

    render() {
        const {classes} = this.props;
        return (

            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    return (
                        <div className={classes.root}>
                            {context.activeStep === context.steps.length ? (
                               <ImportSuccess/>
                            ) : (
                                <Paper>
                                    <Stepper activeStep={context.activeStep} alternativeLabel>
                                        {context.steps.map(label => {
                                            return (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    <Divider light/>

                                    <div className={classes.content}>
                                        {getStepContent(context)}
                                    </div>
                                </Paper>
                            )}
                        </div>);
                }}
            </ImportDataContext.Consumer>
        );
    }
}

ImportStepper.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(ImportStepper);