import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";
import Grid from '@material-ui/core/Grid';
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";
import {ApolloConsumer} from "react-apollo";

const styles = theme => ({
    bottomControls: {
        marginTop: theme.spacing.unit + 5
    }
});


class FooterControls extends Component {

    renderControls = (client) => {
        const {classes} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    const {activeStep, buttonNextEnabled} = context.state;
                    if (activeStep < 3)
                        return (
                            <React.Fragment>
                                <div className={classes.bottomControls}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={16}
                                    >
                                        <Grid item>
                                            <Button
                                                disabled={activeStep === 0}
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
                                                disabled={!buttonNextEnabled}
                                                variant="contained"
                                                color="primary"
                                                onClick={context.handleNext(client)}>
                                                {activeStep === context.steps.length - 1 ? 'Import' : 'Next'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </React.Fragment>
                        )
                }}
            </ImportDataContext.Consumer>
        );
    }

    render() {
        return (
            <ApolloConsumer>
                {client => this.renderControls(client)}
            </ApolloConsumer>
        );
    }
}

FooterControls.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FooterControls);
