import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    bottomControls: {
        marginTop: theme.spacing.unit + 5
    }
});

class FooterControls extends Component {
    render() {
        const {classes} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    return (
                        <React.Fragment>
                            <Paper className={classes.bottomControls}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={16}
                                >
                                    <Grid item>
                                        <Button
                                            disabled={context.activeStep === 0}
                                            onClick={context.handleBack}
                                            className={classes.backButton}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disabled={!context.buttonNextEnabled}
                                            variant="contained"
                                            color="primary"
                                            onClick={context.handleNext}>
                                            {context.activeStep === context.steps.length - 1 ? 'Import' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </React.Fragment>
                    )
                }}
            </ImportDataContext.Consumer>
        );
    }
}

FooterControls.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FooterControls);
