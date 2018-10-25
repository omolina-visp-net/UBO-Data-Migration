import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


class Sonar extends React.Component {

    render() {
        const {classes, handleSonarInputChange, sonarInputs} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item>

                        <TextField
                            id="subdomain"
                            required
                            label="Sonar Subdomain"
                            defaultValue={sonarInputs.subdomain}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={handleSonarInputChange('subdomain')}
                        />

                    </Grid>
                    <Grid item>
                        <TextField
                            key="username"
                            required
                            id="username"
                            label="Username"
                            defaultValue={sonarInputs.username}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={handleSonarInputChange('username')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="password"
                            label="Password"
                            defaultValue={sonarInputs.password}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            type="password"
                            onChange={handleSonarInputChange('password')}
                        />
                    </Grid>
                </Grid>

            </form>
        );
    }
}

Sonar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSonarInputChange: PropTypes.func.isRequired,
    sonarInputs: PropTypes.object.isRequired
};

export default withStyles(styles)(Sonar);