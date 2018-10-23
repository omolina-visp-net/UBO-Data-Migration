import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ImportOptions from "../ImportOptions/ImportOptions";


const styles = theme => ({
    root: {
        width: '90%',
        marginTop: theme.spacing.unit * 5,
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});

function getStepContent(stepIndex, props, classes) {
    switch (stepIndex) {
        case 0:
            return renderImportOptions(props, classes);
        case 1:
            return 'MAP DATA';
        case 2:
            return 'IMPORT';
        default:
            return 'Uknown stepIndex';
    }
}

function renderImportOptions(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <ImportOptions/>
        </div>
    );
}

class ImportStepper extends React.Component {

    render() {
        const {classes, activeStep, steps} = this.props;

        return (
            <div className={classes.root}>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>Success!</Typography>
                    </div>
                ) : (
                    <div>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <Divider light/>
                        {getStepContent(activeStep, this.props)}
                    </div>
                )}
            </div>
        );
    }
}

ImportStepper.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.array.isRequired,
    steps: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired
};

export default withStyles(styles)(ImportStepper);